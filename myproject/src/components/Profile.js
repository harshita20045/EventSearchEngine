import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  // ✅ Load user details from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("fullName") || "John Doe";
    const storedEmail = localStorage.getItem("email") || "user@gmail.com";
    const storedRole = localStorage.getItem("role") || "user";

    setUserData({
      fullName: storedName,
      email: storedEmail,
      role: storedRole,
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 Your Profile</h2>

        {/* ✅ Profile Info */}
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Role:</strong> {userData.role === "user" ? "User" : "Organizer"}
          </p>
        </div>

        {/* 🎟️ Action Buttons */}
        <div className="profile-actions">
          <button className="btn-edit">✏️ Edit Profile</button>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("role");
              localStorage.removeItem("fullName");
              localStorage.removeItem("email");
              window.location.href = "/";
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
