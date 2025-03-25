import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/EventsFeed.css";

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const location = useLocation();

  // ✅ Load Events from localStorage on Component Mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);

    // ✅ Get search term from URL
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search")?.toLowerCase() || "";

    // ✅ Filter events based on search
    const filtered = storedEvents.filter((event) =>
      event.title?.toLowerCase().includes(searchTerm) ||
      event.location?.toLowerCase().includes(searchTerm)
    );
    setFilteredEvents(filtered);
  }, [location.search]);

  return (
    <div className="events-feed-container">
      <h2 className="section-title">🎟️ All Events</h2>

      {filteredEvents.length === 0 ? (
        <p className="no-events">⚠️ No events found matching your search!</p>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <div key={index} className="event-card">
              <img
                src={event.image || "https://via.placeholder.com/300"}
                alt={event.title || "Event"}
                className="event-image"
              />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>📅 {event.date} | 🕓 {event.time}</p>
                <p>📍 {event.location}</p>
                {event.registrationForm && (
                  <a
                    href={event.registrationForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-register"
                  >
                    📄 Register Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
