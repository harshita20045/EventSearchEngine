import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEvent, getEventById, updateEvent } from "../../api";
import "../../styles/AddEvent.css";

export default function AddEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("id");

  const [event, setEvent] = useState({
    name: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (eventId) {
      getEventById(eventId).then((data) => {
        setEvent(data);
        setImagePreview(data.image);
      }).catch((error) => console.error("Error fetching event:", error));
    }
  }, [eventId]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (eventId) {
        await updateEvent(eventId, event);
        alert("✅ Event updated successfully!");
      } else {
        await createEvent(event);
        alert("🎉 New Event Added Successfully!");
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving event:", error);
      alert("⚠ Error saving event.");
    }
  };

  return (
    <div className="add-event-container">
      <h1>{eventId ? "✏ Edit Event" : "📅 Add New Event"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={event.name} onChange={handleChange} required />
        <select name="category" value={event.category} onChange={handleChange} required>
    <option value="">Select a Category</option>
    <option value="Music">🎵 Music</option>
    <option value="Dance">💃 dance</option>
    <option value="Sports">🏆 Sports</option>
    <option value="Technology">💻 Technology</option>
    <option value="Painting">🎨Painting</option>
    <option value="Education">📚 Education</option>
    <option value="Competition"> Competition</option>
</select>

        <input type="date" name="date" value={event.date} onChange={handleChange} required />
        <input type="time" name="time" value={event.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} rows="3" required />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Event Preview" className="event-preview" />}
        <button type="submit" className="btn-admin">{eventId ? "Update Event" : "Add Event"}</button>
      </form>
    </div>
  );
}
