import React from "react";
import "../styles/UpcomingEvents.css";

const upcomingEvents = [
  { id: 1, title: "🎭 Theater Festival", date: "March 25, 2025", location: "Indore" },
  { id: 2, title: "🎤 Stand-Up Comedy", date: "April 5, 2025", location: "Mumbai" },
  { id: 3, title: "🎶 Live Music Night", date: "April 15, 2025", location: "Delhi" },
];

export default function UpcomingEvents() {
  return (
    <section className="upcoming-events">
      <h2>📢 Conference Highlights</h2> {/* Updated heading */}
      <div className="event-grid">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>📅 {event.date} | 📍 {event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
