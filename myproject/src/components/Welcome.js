// src/components/WelcomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-overlay">
        <div className="welcome-content">
          <h1>🎟 Discover & Join Amazing Events!</h1>
          <p>
            Explore events, book tickets, and stay updated with live performances, workshops, and more.
          </p>

          <div className="welcome-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
            <Link to="/home" className="btn btn-tertiary">Browse as Guest</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
