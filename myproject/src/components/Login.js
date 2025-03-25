import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role: User
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error before checking

    // ✅ Admin Login is Separate
    if (role === "admin") {
      setError("⚠ Admin must login from /admin-login");
      return;
    }

    // ✅ Fixed Test Credentials
    if (
      (role === "user" && email === "user@gmail.com" && password === "123") ||
      (role === "organizer" && email === "organizer@gmail.com" && password === "123")
    ) {
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Redirect to Relevant Dashboard
      if (role === "user") navigate("/home");
      else if (role === "organizer") navigate("/organizer");
    } else {
      setError("❌ Invalid credentials! Please try again.");
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
