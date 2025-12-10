"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [message, setMessage] = useState("");

  const customerId = Number(localStorage.getItem("customer_id"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login"; // redirect if not logged in
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenu(res.data);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Failed to fetch menu");
    }
  };

  const addToCart = (itemId: number) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) newCart[itemId]--;
      else delete newCart[itemId];
      return newCart;
    });
  };

  const placeOrder = async () => {
    const items = Object.entries(cart).map(([id, quantity]) => ({
      menu_item_id: Number(id),
      quantity,
    }));

    if (items.length === 0) {
      setMessage("Cart is empty");
      return;
    }

    try {
      const res = await api.post("/orders", {
        customer_id: customerId,
        items,
      });
      setMessage("Order placed successfully! Order ID: " + res.data.id);
      setCart({});
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Order failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Menu</h1>
      {message && <p className="text-red-500">{message}</p>}
      <div className="grid grid-cols-2 gap-4">
        {menu.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2 className="text-xl">{item.name}</h2>
            <p>{item.description}</p>
            <p className="font-bold">${item.price.toFixed(2)}</p>
            <div className="flex gap-2 mt-2 items-center">
              <button
                onClick={() => addToCart(item.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                -
              </button>
              <span>Qty: {cart[item.id] || 0}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
