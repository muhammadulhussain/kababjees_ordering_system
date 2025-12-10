"use client";

import { useState } from "react";
import api from "../../services/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
        phone,
      });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Customer Registration</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 mb-2"
      />
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
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        type="button" // <-- important
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2"
      >
        Register
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}
