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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (role === "admin") {
      setError("⚠ Admin must login from /admin-login");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
        role,
      });

      if (res.data.token && res.data.user) {
        // ✅ Save complete user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("fullName", res.data.user.fullName);
        localStorage.setItem("email", res.data.user.email);
        

        alert("✅ Login successful!");

        // ✅ Redirect by role
        if (role === "user") navigate("/home");
        else if (role === "organizer") navigate("/organizer");
        else if (role === "admin") navigate("/admin-dashboard");
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

          {error && <p className="error-message">{error}</p>}

          <button className="btn-auth" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
