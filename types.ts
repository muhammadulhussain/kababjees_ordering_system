
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'Buckets' | 'Burgers' | 'Deals' | 'Sides' | 'Drinks';
  description: string;
  image: string;
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
