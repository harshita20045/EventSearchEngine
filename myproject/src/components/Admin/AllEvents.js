// src/pages/admin/AllEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Allevents.css";


export default function AllEvents() {
  const [events, setEvents] = useState([]);

  // Backend se data fetch karo
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/event"); // 👈 API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/event/${id}`, { status: "approved" });
      setEvents((prev) =>
        prev.map((event) =>
          event._id === id ? { ...event, status: "approved" } : event
        )
      );
      alert("✅ Event approved!");
    } catch (err) {
      console.error("Error approving event:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:3001/event/${id}`);
        setEvents((prev) => prev.filter((event) => event._id !== id));
        alert("🗑️ Event deleted!");
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div className="admin-main">
      <h1 className="dashboard-title">📃 All Events</h1>
      {events.length === 0 ? (
        <p className="no-events">⚠️ No events found!</p>
      ) : (
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                <th>_id</th>
                <th>Event</th>
                <th>Location</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{event.name}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>{event.category}</td>
                  <td>
                    <span style={{ color: event.status === "approved" ? "green" : "orange" }}>
                      {event.status || "pending"}
                    </span>
                  </td>
                  <td>
                    {event.status !== "approved" && (
                      <button className="approve-btn" onClick={() => handleApprove(event._id)}>
                        ✅ Approve
                      </button>
                    )}
                    <button className="delete-btn" onClick={() => handleDelete(event._id)}>
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
