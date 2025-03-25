// src/components/Admin/AddEvent.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AddEvent.css";

export default function AddEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("id");

  // ✅ Event State
  const [event, setEvent] = useState({
    id: "",
    name: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
    registrationForm: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Load Event Data for Edit
  useEffect(() => {
    if (eventId) {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const eventToEdit = storedEvents.find((e) => e.id === parseInt(eventId));
      if (eventToEdit) {
        setEvent(eventToEdit);
        setImagePreview(eventToEdit.image);
      }
    }
  }, [eventId]);

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
        setImagePreview(reader.result);
        setEvent({ ...event, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let events = JSON.parse(localStorage.getItem("events")) || [];

    if (eventId) {
      // 🔄 Update Existing Event
      const updatedEvents = events.map((e) => (e.id === parseInt(eventId) ? event : e));
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      alert("✅ Event updated successfully!");
    } else {
      // ➕ Add New Event
      const newEvent = { ...event, id: Date.now() };
      events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(events));

      // 🔔 Notify Users about New Event
      alert("🎉 New Event Added Successfully!");
    }

    navigate("/admin");
  };

  return (
    <div className="add-event-container">
      <h1>{eventId ? "✏ Edit Event" : "📅 Add New Event"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={event.name} onChange={handleChange} required />
        <select name="category" value={event.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          <option value="Music">🎵 Music</option>
          <option value="Sports">🏆 Sports</option>
          <option value="Technology">💻 Technology</option>
          <option value="Education">📚 Education</option>
        </select>
        <input type="date" name="date" value={event.date} onChange={handleChange} required />
        <input type="time" name="time" value={event.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} rows="3" required />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Event Preview" className="event-preview" />}
        <input type="text" name="registrationForm" placeholder="Google Form Link for Registration" value={event.registrationForm} onChange={handleChange} />
        <button type="submit" className="btn-admin">{eventId ? "Update Event" : "Add Event"}</button>
      </form>
    </div>
  );
}
