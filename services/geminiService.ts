
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { db } from './db';
import { MENU_ITEMS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const createOrderFn: FunctionDeclaration = {
  name: 'createOrder',
  parameters: {
    type: Type.OBJECT,
    description: 'Create a new food order for the current user.',
    properties: {
      itemIds: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'List of food item IDs to order'
      },
      quantities: {
        type: Type.ARRAY,
        items: { type: Type.INTEGER },
        description: 'Quantities corresponding to the item IDs'
      }
    },
    required: ['itemIds', 'quantities']
  }
};

const trackOrderFn: FunctionDeclaration = {
  name: 'trackOrder',
  parameters: {
    type: Type.OBJECT,
    description: 'Track the status of an existing order.',
    properties: {
      orderId: {
        type: Type.STRING,
        description: 'The unique ID of the order to track'
      }
    },
    required: ['orderId']
  }
};

const getCustomerInfoFn: FunctionDeclaration = {
  name: 'getCustomerInfo',
  parameters: {
    type: Type.OBJECT,
    properties: {}
  }
};

export const handleAgentAction = async (prompt: string) => {
  const model = 'gemini-3-flash-preview';
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: `You are 'Crispy', the Kababjees Fried Chicken Assistant. 
      Your goal is to provide zero waiting time service. 
      Available Menu: ${JSON.stringify(MENU_ITEMS)}.
      Use tools to create orders, track them, or get customer info.
      Be friendly, fast, and suggestive of meal deals.
      If a user asks to order something, extract the item IDs from the menu provided.
      Current User: ${JSON.stringify(db.getCurrentUser())}`,
      tools: [{ functionDeclarations: [createOrderFn, trackOrderFn, getCustomerInfoFn] }]
    }
  });

  const calls = response.functionCalls;
  if (calls && calls.length > 0) {
    const call = calls[0];
    if (call.name === 'createOrder') {
      const { itemIds, quantities } = call.args as any;
      const currentUser = db.getCurrentUser();
      if (!currentUser) return { text: "Please log in first to place an order.", action: 'LOGIN_REQUIRED' };

      const items = itemIds.map((id: string, idx: number) => {
        const menuItem = MENU_ITEMS.find(m => m.id === id);
        return {
          itemId: id,
          name: menuItem?.name || 'Unknown Item',
          quantity: quantities[idx] || 1,
          price: menuItem?.price || 0
        };
      });

      const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
      const newOrder: any = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: currentUser.id,
        items,
        total,
        status: 'Preparing',
        createdAt: new Date().toISOString()
      };

      db.saveOrder(newOrder);
      return { 
        text: `Success! I've placed your order ${newOrder.id}. Total amount: Rs. ${total}. Your chicken is being prepared!`, 
        order: newOrder 
      };
    }

    if (call.name === 'trackOrder') {
      const { orderId } = call.args as any;
      const order = db.trackOrder(orderId);
      if (order) {
        return { text: `Order ${orderId} is currently: ${order.status}. It should be with you shortly!` };
      }
      return { text: `Sorry, I couldn't find an order with ID ${orderId}.` };
    }

    if (call.name === 'getCustomerInfo') {
      const user = db.getCurrentUser();
      return { text: user ? `You are logged in as ${user.name}. Address: ${user.address || 'Not set'}.` : "You are not logged in." };
    }
  }

  return { text: response.text };
};
