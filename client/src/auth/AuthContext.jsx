import React, { createContext, useContext, useEffect, useState } from "react";
import  jwtDecode from "jwt-decode";

import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Configure axios once
  axios.defaults.baseURL = "http://localhost:5000"; // Sana’s backend
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      try {
        const d = jwtDecode(t);
        setUser({ id: d.id, role: d.role, exp: d.exp });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const d = jwtDecode(token);
      setUser({ id: d.id, role: d.role, exp: d.exp });
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
