
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthState } from '../types';

interface NavbarProps {
  auth: AuthState;
  onOpenAuth: () => void;
  onLogout: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ auth, onOpenAuth, onLogout, cartCount }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path ? 'text-rose-600' : 'text-gray-700';

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="bg-rose-600 text-white p-2 rounded-lg font-bold text-xl italic">KFC</span>
              <span className="font-bold text-xl hidden sm:block">Kababjees <span className="text-rose-600">Fried Chicken</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} hover:text-rose-600 font-medium transition-colors`}>Home</Link>
            <Link to="/menu" className={`${isActive('/menu')} hover:text-rose-600 font-medium transition-colors`}>Menu</Link>
            <Link to="/agent" className={`${isActive('/agent')} hover:text-rose-600 font-medium transition-colors flex items-center gap-1.5`}>
              <i className="fas fa-robot text-xs"></i> AI Agent
            </Link>
            {auth.isAuthenticated && (
              <Link to="/orders" className={`${isActive('/orders')} hover:text-rose-600 font-medium transition-colors`}>Orders</Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer group p-2">
              <i className="fas fa-shopping-cart text-gray-700 text-xl group-hover:text-rose-600 transition-colors"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>

            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-rose-50 transition-colors">
                  <i className="fas fa-user text-rose-600"></i>
                </Link>
                <button 
                  onClick={onLogout}
                  className="hidden sm:block text-gray-500 hover:text-rose-600 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="bg-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
