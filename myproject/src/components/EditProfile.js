// src/components/EditProfile.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";


export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Assuming user data is stored locally for now
    setFormData({
      fullName: localStorage.getItem("fullName") || "",
      email: localStorage.getItem("email") || "",
      city: localStorage.getItem("city") || "",
      address: localStorage.getItem("address") || "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // 🚧 In future: Add token-based secure call
      await axios.put("/edit-profile", formData);

      // Update localStorage
      localStorage.setItem("fullName", formData.fullName);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("city", formData.city);
      localStorage.setItem("address", formData.address);

      alert("✅ Profile updated!");
      navigate("/profile");
    } catch (error) {
      alert("❌ Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleUpdate}>
        <h2>✏️ Edit Profile</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" className="btn-edit">
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
}
