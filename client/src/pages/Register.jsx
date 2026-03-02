 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [role, setRole] = useState("student");

 
  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        {err && <p className="error">{err}</p>}
<div className="role-switch">
  <button
    type="button"
    className={role === "student" ? "active" : ""}
    onClick={() => setRole("student")}
  >
    Student
  </button>

  <button
    type="button"
    className={role === "admin" ? "active" : ""}
    onClick={() => setRole("admin")}
  >
    Admin
  </button>
</div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}