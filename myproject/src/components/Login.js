import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role: User
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before checking

    // ✅ Admin Login is Separate
    if (role === "admin") {
      setError("⚠ Admin must login from /admin-login");
      return;
    }

    // ✅ Fixed Test Credentials
    try {
      const res = await axios.post("http://localhost:3001/user/login", { email, password, role });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);
        alert("✅ Login successful!");

        // ✅ Role-wise redirection
        if (role === "user") navigate("/home");
        else if (role === "organizer") navigate("/organizer");
        else if (role === "admin") navigate("/admin-dashboard"); // Just in case
      } else {
        setError("❌ Invalid credentials! Please try again.");
      }
    } catch (error) {
      setError("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔑 Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          {/* ✅ Role Selection */}
          <div className="role-selector">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="organizer"
                checked={role === "organizer"}
                onChange={() => setRole("organizer")}
              />
              Organizer
            </label>
          </div>

          {/* ✅ Email & Password */}
          <input
            type="email"
            placeholder="Email"
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

          {/* ✅ Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Login Button */}
          <button className="btn-auth" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
