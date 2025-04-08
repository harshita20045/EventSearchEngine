import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../../api";
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

  useEffect(() => {
    getEventById(id)
      .then((data) => {
        setEvent(data);
        setImagePreview(data.image);
      })
      .catch(() => {
        alert("⚠ No event found!");
        navigate("/organizer");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, event);
      alert("✅ Event updated successfully!");
      navigate("/organizer");
    } catch (error) {
      alert("⚠ Error updating event.");
    }
  };

  return (
    <div className="add-event-container">
      <h1>✏ Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} required />
        <button type="submit" className="btn-organizer">✏ Update Event</button>
      </form>
    </div>
  );
}
