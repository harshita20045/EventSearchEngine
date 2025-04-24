import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminProfile.css'; // Add custom CSS for styling

function AdminProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-card">
        <div className="admin-profile-header">
          <h2>Admin Profile</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="admin-profile-details">
          <div className="profile-detail">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user?.name}</span>
          </div>
          <div className="profile-detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user?.email}</span>
          </div>
          <div className="profile-detail">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{user?.role}</span>
          </div>
          <div className="profile-detail">
            <span className="detail-label">City:</span>
            <span className="detail-value">{user?.city}</span>
          </div>
          <div className="profile-detail">
            <span className="detail-label">Mobile:</span>
            <span className="detail-value">{user?.mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
