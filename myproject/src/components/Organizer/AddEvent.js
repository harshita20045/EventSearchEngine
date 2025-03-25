import React, { useState } from "react";
import "../../styles/AddEventO.css";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const navigate = useNavigate();

  // ✅ Event State
  const [event, setEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent({ ...event, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Get Existing Events from Local Storage
    let events = JSON.parse(localStorage.getItem("events")) || [];

    // 🔥 Add New Event
    events.push({ ...event, id: Date.now() });

    // 🔥 Save Updated Events to Local Storage
    localStorage.setItem("events", JSON.stringify(events));

    alert(`✅ Event "${event.title}" added successfully!`);

    // 🔥 Redirect to Organizer Dashboard
    navigate("/organizer");

    // Clear Form
    setEvent({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="add-event-container">
      <h1>📅 Add a New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        />
        <select name="category" value={event.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          <option value="Music">🎵 Music</option>
          <option value="Sports">🏆 Sports</option>
          <option value="Technology">💻 Technology</option>
          <option value="Education">📚 Education</option>
        </select>
        <input type="date" name="date" value={event.date} onChange={handleChange} required />
        <input type="time" name="time" value={event.time} onChange={handleChange} required />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          rows="3"
          required
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        {event.image && <img src={event.image} alt="Event Preview" className="event-preview" />}
        <button type="submit" className="btn-organizer">
          ➕ Add Event
        </button>
      </form>
    </div>
  );
}
