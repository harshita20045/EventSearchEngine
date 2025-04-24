import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchEvents, searchEvents } from "../api";
import "../styles/EventsFeed.css";

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search")?.toLowerCase() || "";

    const getEvents = async () => {
      try {
        const data = searchTerm ? await searchEvents(searchTerm) : await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      
    };

    getEvents();
  }, [location.search]);

  return (
    <div className="events-feed-container">
      <h2 className="section-title">🎟 All Events</h2>
      {events.length === 0 ? (
        <p className="no-events">⚠ No events found matching your search!</p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.image || "https://via.placeholder.com/300"} alt={event.name || "Event"} className="event-image" />
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>📅 {event.date} | 🕓 {event.time} </p>
                <p>📍 {event.location}</p>
                {event.registrationForm && (
                  <a href={event.registrationForm} target="_blank" rel="noopener noreferrer" className="btn-register">
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
