
import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = db.getUsers();
    
    if (isLogin) {
      const user = users.find(u => u.email === formData.email);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or user not found. Please register.');
      }
    } else {
      if (!formData.name || !formData.email) {
        setError('Please fill all fields');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email
      };
      db.saveUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative p-8">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-rose-600 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back!' : 'Join the Family'}</h2>
            <p className="text-gray-500 mt-2">{isLogin ? 'Sign in to order faster' : 'Register for faster AI ordering'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            {error && <p className="text-rose-600 text-xs font-medium">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-rose-600 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
