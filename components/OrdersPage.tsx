
import React, { useEffect, useState } from 'react';
import { User, Order } from '../types';
import { db } from '../services/db';

interface OrdersPageProps {
  user: User | null;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const allOrders = db.getOrders();
      setOrders(allOrders.filter(o => o.userId === user.id).reverse());
    }
  }, [user]);

  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Please login to view your orders.</h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Orders</h2>
          <p className="text-gray-500">Track your current and past meal deliveries.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-xl text-rose-600 font-bold flex items-center gap-2">
          <i className="fas fa-receipt"></i>
          {orders.length} Total Orders
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
             <i className="fas fa-shopping-bag text-3xl"></i>
           </div>
           <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
           <p className="text-gray-500 mt-2 mb-8">Hungry? Your first crispy bite is just a tap away.</p>
           <a href="/" className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition-all">
             Start Ordering
           </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-gray-400">Order ID:</span>
                    <span className="font-mono text-gray-900">{order.id}</span>
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700 animate-pulse'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-4">Placed on: {new Date(order.createdAt).toLocaleString()}</div>
                  
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-medium">
                          <span className="text-rose-600 font-bold">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="text-gray-400">Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="sm:border-l border-gray-100 sm:pl-8 flex flex-col justify-between items-end min-w-[150px]">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total Bill</p>
                    <p className="text-2xl font-bold text-rose-600">Rs. {order.total}</p>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-rose-600 font-medium transition-colors">
                    Download Receipt
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 px-8 border-t border-gray-100 flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                 <div className="flex-grow bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`bg-rose-600 h-full rounded-full transition-all duration-1000`} style={{
                      width: order.status === 'Preparing' ? '33%' : order.status === 'Out for Delivery' ? '66%' : '100%'
                    }}></div>
                 </div>
                 <span>Status Tracking</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
