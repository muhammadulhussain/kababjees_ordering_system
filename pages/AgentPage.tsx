
import React, { useState, useRef, useEffect } from 'react';
import { handleAgentAction } from '../services/geminiService';

interface AgentPageProps {
  onLoginRequest: () => void;
}

const AgentPage: React.FC<AgentPageProps> = ({ onLoginRequest }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Welcome to the Kababjees AI Concierge. I am Crispy! How can I satisfy your cravings today? You can say "Order a Mega Deal" or "Track my last order".' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const result = await handleAgentAction(textToSend);
      if (result.action === 'LOGIN_REQUIRED') {
        onLoginRequest();
        setMessages(prev => [...prev, { role: 'bot', text: "I'd love to help, but you need to log in first! I've opened the login form for you." }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: result.text || "Sorry, I missed that. Could you try again?" }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Something went wrong on my end. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "Order 9-Piece Bucket",
    "What's in the Mega Deal?",
    "Track my order",
    "Edit my profile"
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-12 px-4 bg-gray-50/50">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-rose-100 overflow-hidden flex flex-col border border-rose-50">
        <div className="bg-rose-600 p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <i className="fas fa-robot text-3xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Meet "Crispy"</h1>
              <p className="text-rose-100 text-sm font-medium">Your Personal 24/7 AI Food Agent</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <span className="bg-rose-700 px-3 py-1.5 rounded-lg border border-rose-500/50">Zero Wait Time</span>
            <span className="bg-green-500 px-3 py-1.5 rounded-lg">Online</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 h-[500px] bg-gradient-to-b from-white to-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] sm:max-w-[70%] px-6 py-4 rounded-3xl text-base leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-rose-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex gap-2">
                <span className="w-2 h-2 bg-rose-200 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-rose-600 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-white border-t border-gray-100 space-y-6">
          <div className="flex flex-wrap gap-2">
             {quickActions.map(action => (
               <button 
                key={action}
                onClick={() => handleSend(action)}
                className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors border border-gray-100"
               >
                 {action}
               </button>
             ))}
          </div>
          
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your order details here..."
              className="flex-grow px-6 py-4 bg-gray-50 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-rose-500/10 border border-transparent focus:border-rose-200 transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading}
              className="px-8 bg-rose-600 text-white rounded-2xl flex items-center justify-center hover:bg-rose-700 transition-all disabled:opacity-50 shadow-lg shadow-rose-200"
            >
              <i className="fas fa-paper-plane text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-sm flex items-center gap-2">
        <i className="fas fa-shield-alt text-rose-500"></i>
        Secured AI ordering powered by Gemini 3.0
      </p>
    </div>
  );
};

export default AgentPage;
