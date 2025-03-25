import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/AddEventO.css";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Fetch Event Details when Component Loads
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventToEdit = events[id];
    if (eventToEdit) {
      setEvent(eventToEdit);
      setImagePreview(eventToEdit.image);
    } else {
      alert("⚠️ No event found!");
      navigate("/organizer");
    }
  }, [id, navigate]);

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

    // 🔥 Get Existing Events
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events[id] = event;

    // 🔥 Save Updated Events to Local Storage
    localStorage.setItem("events", JSON.stringify(events));

    alert("✅ Event updated successfully!");
    navigate("/organizer");
  };

  return (
    <div className="add-event-container">
      <h1>✏️ Edit Event</h1>
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
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Event Preview" className="event-preview" />}
        <button type="submit" className="btn-organizer">
          ✏️ Update Event
        </button>
      </form>
    </div>
  );
}
