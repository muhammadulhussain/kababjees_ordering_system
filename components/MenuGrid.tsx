
import React from 'react';
import { FoodItem } from '../types';

interface MenuGridProps {
  items: FoodItem[];
  onAddToCart: () => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item) => (
        <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-rose-600">
              Rs. {item.price}
            </div>
            <div className="absolute top-4 left-4">
               <span className="bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                 {item.category}
               </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
              {item.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>
            <button 
              onClick={onAddToCart}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors"
            >
              <i className="fas fa-plus text-xs"></i>
              Add to Basket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;
