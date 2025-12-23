
import { User, Order, FoodItem } from '../types';

const USERS_KEY = 'kfc_users';
const ORDERS_KEY = 'kfc_orders';
const CURRENT_USER_KEY = 'kfc_current_user';

export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
  
  saveUser: (user: User) => {
    const users = db.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  updateUser: (updatedUser: User) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      // Also update session if it's the current user
      const currentUser = db.getCurrentUser();
      if (currentUser?.id === updatedUser.id) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }
    }
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  },

  getOrders: (): Order[] => JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'),

  saveOrder: (order: Order) => {
    const orders = db.getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  trackOrder: (orderId: string): Order | undefined => {
    return db.getOrders().find(o => o.id === orderId);
  }
};
