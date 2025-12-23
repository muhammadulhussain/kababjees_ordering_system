
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onOrderNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderNow }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Fastest Delivery in Karachi</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Craving for <span className="text-rose-600 underline decoration-yellow-400">Crispy?</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Order your favorite Kababjees Fried Chicken instantly with our 
            <span className="font-bold text-gray-900"> AI Food Agent</span>. 
            Zero waiting time, 100% satisfaction. 24/7 availability!
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              to="/menu"
              className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <i className="fas fa-utensils"></i>
              Explore Menu
            </Link>
            <Link 
              to="/agent"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <i className="fas fa-robot text-yellow-400"></i>
              AI Food Agent
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
             <div className="flex items-center gap-2">
                <i className="fas fa-star text-yellow-400"></i>
                <span className="font-bold">4.9/5</span>
                <span className="text-gray-400 text-sm">(12k+ reviews)</span>
             </div>
             <div className="h-4 w-px bg-gray-200"></div>
             <div className="flex items-center gap-2">
                <i className="fas fa-clock text-rose-600"></i>
                <span className="font-bold">24/7 Service</span>
             </div>
          </div>
        </div>
        <div className="flex-1 mt-12 lg:mt-0 relative">
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 -z-10 animate-pulse"></div>
          <img 
            src="https://kababjeesfriedchicken.com/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fupload%2F1722625906-lgoo.png%3Fq%3D10&w=640&q=75" 
            alt="Fried Chicken Bucket" 
            className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
          />
          <div className="absolute -bottom-6 -right-6 bg-rose-600 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <i className="fas fa-bolt text-xl"></i>
            </div>
            <div>
              <p className="font-bold text-white">10 Min Delivery</p>
              <p className="text-bold text-white">Fastest in Karachi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
