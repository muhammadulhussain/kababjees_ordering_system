import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { db } from './db';
import { MENU_ITEMS } from '../constants';

// API Key Load karein
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const handleAgentAction = async (prompt: string) => {
  try {
    // 1. Tools ko yahan model initialization ke waqt hi define kar dein
    // 2. v1beta hi use karein kyunki function calling preview feature hai
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      tools: [{
        functionDeclarations: [
          {
            name: 'createOrder',
            description: 'Create a new food order for the current user.',
            parameters: {
              type: SchemaType.OBJECT,
              properties: {
                itemIds: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: 'IDs of items' },
                quantities: { type: SchemaType.ARRAY, items: { type: SchemaType.NUMBER }, description: 'Quantities' }
              },
              required: ['itemIds', 'quantities']
            }
          },
          {
            name: 'trackOrder',
            description: 'Track the status of an existing order.',
            parameters: {
              type: SchemaType.OBJECT,
              properties: {
                orderId: { type: SchemaType.STRING, description: 'Order ID to track' }
              },
              required: ['orderId']
            }
          }
        ],
      }],
    });

    // System instruction ko context mein bhejna
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are 'Crispy', the Kababjees Fried Chicken AI Assistant.
            Available Menu: ${JSON.stringify(MENU_ITEMS)}.
            Current User: ${JSON.stringify(db.getCurrentUser())}.
            If the user wants to order, use createOrder. If they want to track, use trackOrder.` 
          }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am Crispy, ready to take your order." }],
        }
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    // Function calls check karein
    const calls = response.functionCalls();

    if (calls && calls.length > 0) {
      const call = calls[0];
      console.log("Function Executing:", call.name);

      if (call.name === 'createOrder') {
        const { itemIds, quantities } = call.args as any;
        const currentUser = db.getCurrentUser();
        if (!currentUser) return { text: "Please log in first.", action: 'LOGIN_REQUIRED' };

        const newOrder: any = {
          id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          userId: currentUser.id,
          status: 'Preparing',
          total: 1000 // Sample Price
        };
        db.saveOrder(newOrder);
        return { text: `Order ${newOrder.id} placed! Crispy is getting your chicken ready!` };
      }

      if (call.name === 'trackOrder') {
        const { orderId } = call.args as any;
        const order = db.trackOrder(orderId);
        return { text: order ? `Order ${orderId} is currently: ${order.status}` : "Order not found." };
      }
    }

    return { text: response.text() };

  } catch (error: any) {
    console.error("DEBUG ERROR:", error);
    
    // Agar region block ho (404/403)
    if (error.message?.includes('404') || error.message?.includes('location')) {
        return { text: "Crispy: Pakistan se direct connection mein masla ho raha hai. Please aik baar VPN try karein." };
    }
    
    // Agar structure galat ho (400)
    if (error.message?.includes('400')) {
        return { text: "Crispy: Mere dimagh mein thora masla ho raha hai (API Error). Please dobara koshish karein." };
    }

    throw error;
  }
};