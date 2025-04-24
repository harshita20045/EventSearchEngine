import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((event) => event.id !== id);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      alert("✅ Event deleted successfully!");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/add-event?id=${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div>
          <h2>🏢 Admin Panel</h2>
          <nav>
            <ul className="nav-links">
              <li><Link to="/admin/profile" className="nav-link">👤 Profile</Link></li>
              <li><Link to="/admin/add-event" className="nav-link">➕ Add Event</Link></li>
              <li><Link to="/admin/users" className="nav-link">👥 User List</Link></li>
              <li><Link to ="/admin/all-events" className="nav-link">📅 All Events</Link></li>
            </ul>
          </nav>
        </div>
        <button className="logout-btn" onClick={handleLogout}>🔒 Logout</button>
      </aside>

      <main className="admin-main">
        <h1 className="dashboard-title">📅 Events Overview</h1>
        {events.length === 0 ? (
          <p className="no-events">⚠️ No events available. Add some!</p>
        ) : (
          <div className="event-list">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image || "https://via.placeholder.com/300"} alt={event.name} />
                <h3>{event.name}</h3>
                <p className="event-meta">📍 {event.location} | 🗓 {event.date}</p>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => handleEdit(event.id)}>✏ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
