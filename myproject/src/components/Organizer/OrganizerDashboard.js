import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/OrganizerDashboard.css";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // ✅ Load Organizer Events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // ✅ Handle Delete Event
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      const updatedEvents = events.filter((_, i) => i !== index);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      alert("Event deleted successfully!");
    }
  };

  // ✅ Handle Edit Event
  const handleEdit = (index) => {
    navigate(`/organizer/edit-event/${index}`);
  };

  // ✅ Redirect to Add Event Page
  const handleAddEvent = () => {
    navigate("/organizer/add-event");
  };

  return (
    <div className="organizer-dashboard">
      <h2>📌 Manage Your Events</h2>
      <button className="btn-add-event" onClick={handleAddEvent}>
        ➕ Add Event
      </button>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events created yet. Add your first event!</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image || "https://via.placeholder.com/300"} alt={event.name} />
              <h3>{event.name}</h3>
              <p>📅 {event.date} | 📍 {event.location}</p>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  ✏ Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
