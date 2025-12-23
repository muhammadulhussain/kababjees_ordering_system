
import React, { useState, useRef, useEffect } from 'react';
import { handleAgentAction } from '../services/geminiService';

interface ChatWidgetProps {
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isAuthenticated, onLoginRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hey there! I am Crispy. Need help ordering some delicious fried chicken?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await handleAgentAction(userMsg);
      if (result.action === 'LOGIN_REQUIRED') {
        onLoginRequest();
        setMessages(prev => [...prev, { role: 'bot', text: "You need to log in to do that. I've opened the login window for you!" }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: result.text || "Sorry, I missed that. Can you repeat?" }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Hmm, I'm having a technical hiccup. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          <div className="bg-rose-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Crispy Assistant</p>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                   <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Zero Wait Agent</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-rose-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Order a Zinger or Track Order..."
              className="flex-grow px-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center hover:bg-rose-700 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative group"
      >
        <i className={`fas ${isOpen ? 'fa-comment-slash' : 'fa-robot'} text-2xl`}></i>
        {!isOpen && (
          <span className="absolute -top-2 -left-2 bg-yellow-400 text-rose-900 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white animate-bounce">
            AI READY
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
