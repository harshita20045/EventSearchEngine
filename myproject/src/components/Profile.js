// src/components/Profile.js

import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "",
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage se data fetch
    const storedName = localStorage.getItem("fullName") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedRole = localStorage.getItem("role") || "";
    

    setUserData({
      fullName: storedName,
      email: storedEmail,
      role: storedRole,
      
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // sab data hata do
    navigate("/"); // home ya login page pe redirect
  };

  const handleEdit = () => {
    navigate("/edit-profile"); // edit profile page pe jao
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 Your Profile</h2>

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

        <div className="profile-actions">
          <button className="btn-edit" onClick={handleEdit}>
            ✏️ Edit Profile
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
