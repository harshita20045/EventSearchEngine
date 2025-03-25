// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // ✅ Load Events from localStorage
  useEffect(() => {
    loadEvents();
  }, []);

  // ✅ Load Events Function
  const loadEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  };

  // ✅ Handle Delete Event
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      const updatedEvents = events.filter((event) => event.id !== id);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      alert("✅ Event deleted successfully!");
    }
  };

  // ✅ Handle Edit Event
  const handleEdit = (id) => {
    navigate(`/admin/add-event?id=${id}`);
  };

  // ✅ Redirect to Add Event Page
  const handleAddEvent = () => {
    navigate("/admin/add-event");
  };

  return (
    <div className="admin-dashboard">
      <h2>📌 Manage Events</h2>
      <button className="btn-add-event" onClick={handleAddEvent}>
        ➕ Add Event
      </button>

      {/* ✅ Show Events or No Events Message */}
      {events.length === 0 ? (
        <p className="no-events">⚠️ No events available. Add some!</p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image || "https://via.placeholder.com/300"} alt={event.name} />
              <h3>{event.name}</h3>
              <p>
                📅 {event.date} | 📍 {event.location}
              </p>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => handleEdit(event.id)}>
                  ✏ Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
