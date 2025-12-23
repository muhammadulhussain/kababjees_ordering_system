
import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [isSaved, setIsSaved] = useState(false);

  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Please login to view your profile.</h2>
    </div>
  );

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    db.updateUser(updatedUser);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-rose-600 h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <i className="fas fa-user text-4xl text-rose-600"></i>
            </div>
          </div>
        </div>
        <div className="pt-16 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
          <p className="text-gray-500 mb-8">Update your details for faster deliveries.</p>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="+92 3XX XXXXXXX"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Delivery Address</label>
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Building, Street, Area, Karachi"
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between mt-4">
              <button 
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-600 transition-all flex items-center gap-2"
              >
                <i className="fas fa-save"></i>
                Save Changes
              </button>
              {isSaved && (
                <span className="text-green-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-right">
                  <i className="fas fa-check-circle"></i>
                  Updated successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
