// src/components/EventCard.js
import React from "react";
import "../styles/EventCard.css"; // ✅ CSS for Event Card

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      {/* 🎟️ Event Image */}
      <img
        src={event.image || "https://via.placeholder.com/300"}
        alt={event.name}
        className="event-image"
      />
      
      {/* 📄 Event Details */}
      <div className="event-details">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>📍 {event.location}</p>
        <p>📅 {event.date}</p>

        {/* 📄 Registration Form Link (Optional) */}
        {event.registrationForm ? (
          <a
            href={event.registrationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view"
          >
            📄 Register Now
          </a>
        ) : (
          <button className="btn-view">View Details</button>
        )}
      </div>
    </div>
  );
}
