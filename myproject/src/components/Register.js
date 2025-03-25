import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role: User
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); // Reset error before checking

    if (password !== confirmPassword) {
      setError("⚠ Passwords do not match!");
      return;
    }

    // ✅ Store Credentials for Testing
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("password", password);

    alert("✅ Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>👤 Create an Account</h2>
        <form onSubmit={handleRegister}>
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

          {/* ✅ Input Fields */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* ✅ Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Register Button */}
          <button className="btn-auth" type="submit">
            Register
          </button>
        </form>

        {/* ✅ Already Have an Account? */}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
