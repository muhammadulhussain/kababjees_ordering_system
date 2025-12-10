"use client";

import { useState } from "react";
import api from "../../services/api";
import Link from "next/link"; // import Link

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const token = res.data.access_token;

    // Save token in localStorage
    localStorage.setItem("token", token);

    setMessage("Login successful! Redirecting...");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1200);

  } catch (err: any) {
    setMessage(err.response?.data?.detail || "Login failed");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Customer Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 mb-2"
      >
        Login
      </button>

      {/* Link to Register Page */}
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register here
        </Link>
      </p>

      <p className="mt-2 text-red-500">{message}</p>
    </div>
  );
}
