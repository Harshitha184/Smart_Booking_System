import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-100 p-3 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="font-semibold">SmartBooking</Link>
        {user && user.role !== "admin" && <Link to="/rooms">Rooms</Link>}
        {user && user.role === "admin" && <Link to="/admin/rooms">Admin</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-3">Role: {user.role}</span>
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
