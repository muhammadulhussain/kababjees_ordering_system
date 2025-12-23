
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { User, AuthState } from './types';
import { db } from './services/db';
import { MENU_ITEMS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuGrid from './components/MenuGrid';
import ChatWidget from './components/ChatWidget';
import AuthModal from './components/AuthModal';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import MenuPage from './pages/MenuPage';
import AgentPage from './pages/AgentPage';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: db.getCurrentUser(),
    isAuthenticated: !!db.getCurrentUser()
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleLogin = (user: User) => {
    db.setCurrentUser(user);
    setAuth({ user, isAuthenticated: true });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    db.setCurrentUser(null);
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar 
          auth={auth} 
          onOpenAuth={() => setIsAuthModalOpen(true)} 
          onLogout={handleLogout}
          cartCount={cartCount}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero 
                  onOrderNow={() => {}} // Handled by Links in Hero
                />
                <div className="max-w-7xl mx-auto px-4 py-16">
                  <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold flex items-center">
                      <span className="w-2 h-8 bg-rose-600 mr-4 rounded-full"></span>
                      Featured Deals
                    </h2>
                    <Link to="/menu" className="text-rose-600 font-bold hover:underline">View Full Menu <i className="fas fa-arrow-right ml-1"></i></Link>
                  </div>
                  <MenuGrid items={MENU_ITEMS.slice(0, 4)} onAddToCart={() => setCartCount(c => c + 1)} />
                </div>
                
                <section className="bg-rose-600 py-16 text-white">
                   <div className="max-w-7xl mx-auto px-4 text-center">
                      <h2 className="text-4xl font-bold mb-4">Tired of Waiting?</h2>
                      <p className="text-rose-100 text-xl mb-8 max-w-2xl mx-auto">Our AI Agent "Crispy" is ready to take your order 24/7 with zero delay. Experience the future of food ordering.</p>
                      <Link to="/agent" className="bg-white text-rose-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform inline-block">
                        Talk to Crispy Now
                      </Link>
                   </div>
                </section>
              </>
            } />
            <Route path="/menu" element={<MenuPage onAddToCart={() => setCartCount(c => c + 1)} />} />
            <Route path="/agent" element={<AgentPage onLoginRequest={() => setIsAuthModalOpen(true)} />} />
            <Route path="/profile" element={<ProfilePage user={auth.user} />} />
            <Route path="/orders" element={<OrdersPage user={auth.user} />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-white py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Kababjees Fried Chicken</h3>
              <p className="text-gray-400">Bringing you the crispiest chicken in town with zero waiting time thanks to our AI ordering system.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/agent">AI Agent</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">UAN: 111-KFC-000</p>
              <p className="text-gray-400">Email: support@kababjeesfriedchicken.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Kababjees Fried Chicken. All Rights Reserved.
          </div>
        </footer>

        <ChatWidget isAuthenticated={auth.isAuthenticated} onLoginRequest={() => setIsAuthModalOpen(true)} />
        
        {isAuthModalOpen && (
          <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;
