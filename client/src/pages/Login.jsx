import React, { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data.token);
      if (data.user.role === "admin") navigate("/admin/rooms");
      else navigate("/rooms");
    } catch (e) {
      setErr(e.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm p-6 border rounded space-y-3"
      >
        <h2 className="text-xl font-medium">Login</h2>
        {err && <div className="text-red-600">{err}</div>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button className="w-full p-2 bg-black text-white rounded">
          Sign in
        </button>
        <div className="text-sm mt-2">
          No account?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
