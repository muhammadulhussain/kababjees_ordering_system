"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer_id");
    window.location.href = "/login";
  };

  if (!loggedIn) return null; // hide navbar if not logged in

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link href="/menu" className="hover:text-gray-300">
          Menu
        </Link>
        <Link href="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
