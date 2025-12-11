import { useEffect, useState } from "react";
import api from "../utils/api";
import { getToken, removeToken } from "../utils/auth";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/customers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (e) {
        removeToken();
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p>Name: {user.full_name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
