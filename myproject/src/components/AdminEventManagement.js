import React, { useState } from "react";
import "../styles/AdminEventManagement.css"; // Make sure to create this CSS file

export default function AdminEventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    image: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewEvent({ ...newEvent, image: URL.createObjectURL(file) });
  };

  // ✅ Add New Event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.category) {
      alert("Please fill in all fields!");
      return;
    }
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: "", date: "", location: "", category: "", image: "" });
  };

  // ✅ Delete Event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="admin-event-container">
      <h2>🎟 Manage Events</h2>

      {/* ✅ Add Event Form */}
      <div className="event-form">
        <input type="text" name="title" placeholder="Event Title" value={newEvent.title} onChange={handleChange} />
        <input type="date" name="date" value={newEvent.date} onChange={handleChange} />
        <input type="text" name="location" placeholder="Event Location" value={newEvent.location} onChange={handleChange} />
        <select name="category" value={newEvent.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      {/* ✅ Event List */}
      <div className="event-list">
        {events.length === 0 ? <p>No events added yet.</p> : events.map((event) => (
          <div key={event.id} className="event-card">
            {event.image && <img src={event.image} alt="Event" />}
            <h3>{event.title}</h3>
            <p>📅 {event.date} | 📍 {event.location}</p>
            <p>🗂 Category: {event.category}</p>
            <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
