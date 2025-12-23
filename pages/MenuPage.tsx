
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import MenuGrid from '../components/MenuGrid';

interface MenuPageProps {
  onAddToCart: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Buckets', 'Burgers', 'Deals', 'Sides', 'Drinks'];

  const filteredItems = filter === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Our Delicious <span className="text-rose-600">Menu</span></h1>
        <p className="text-gray-500 max-w-xl mx-auto">From signature buckets to spicy burgers, find your perfect meal here. Every piece is seasoned to perfection.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full font-bold transition-all border-2 ${
              filter === cat 
                ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-rose-200 hover:text-rose-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <MenuGrid items={filteredItems} onAddToCart={onAddToCart} />
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <i className="fas fa-search text-4xl text-gray-200 mb-4"></i>
          <p className="text-gray-400">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
