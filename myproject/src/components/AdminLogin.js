import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Admin Credentials
  const adminEmail = ("harshita@gmail.com", "rashmi@gmail.com");
  const adminPassword = ("1234", "rashmi1111");

  // 🎯 Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!email || !password) {
      setError("⚠️ Please fill all fields.");
      return;
    }

    // ✅ Check Admin Credentials
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("role", "admin"); // ✅ Store admin role in localStorage
      navigate("/admin"); // ✅ Redirect to Admin Dashboard
    } else {
      setError("❌ Invalid email or password.");
    }
  };

  return (
    <div className="admin-login">
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin}>
        {/* ✅ Email Input */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* ✅ Password Input */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ⚠️ Show Error if any */}
        {error && <p className="error">{error}</p>}

        {/* 🎯 Login Button */}
        <button type="submit" className="login-btn">
          🚀 Login
        </button>
      </form>
    </div>
  );
}
