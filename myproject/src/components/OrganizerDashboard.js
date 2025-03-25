// src/components/Organizer/OrganizerDashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Organizer/OrganizerDashboard.css";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const organizerEmail = localStorage.getItem("email"); // Get current organizer email

  // ✅ Fetch Events and Filter Organizer's Events
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const filteredEvents = storedEvents.filter(
      (event) => event.organizer === organizerEmail
    );
    setEvents(filteredEvents);
  }, []);

  // ✅ Handle Event Deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      const updatedEvents = events.filter((event) => event.id !== id);
      const allEvents = JSON.parse(localStorage.getItem("events")) || [];
      const remainingEvents = allEvents.filter((event) => event.id !== id);

      localStorage.setItem("events", JSON.stringify(remainingEvents));
      setEvents(updatedEvents);
      alert("Event deleted successfully!");
    }
  };

  return (
    <div className="organizer-dashboard">
      <h1>🎯 Organizer Dashboard</h1>

      {/* ➕ Add New Event Button */}
      <div className="dashboard-actions">
        <Link to="/organizer/add-event" className="btn-primary">
          ➕ Add New Event
        </Link>
      </div>

      {/* 📚 Show Events Created by Organizer */}
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events created yet. Add some events!</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.name} className="event-img" />
              <h3>{event.name}</h3>
              <p>📅 {event.date} | 📍 {event.location}</p>
              <div className="event-actions">
                {/* ✏️ Edit Event */}
                <Link to={`/organizer/edit-event/${event.id}`} className="btn-edit">
                  ✏️ Edit
                </Link>
                {/* 🗑️ Delete Event */}
                <button className="btn-delete" onClick={() => handleDelete(event.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
