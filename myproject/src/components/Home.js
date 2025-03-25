// src/components/Home.js
import React, { useState } from "react";
import Banner from "./Banner";
import "../styles/Home.css";
import EventCard from "./EventCard"; // ✅ Import EventCard

export default function Home() {
  const [events] = useState([
    {
      id: 1,
      name: "🎶 Music Festival",
      description: "A fun-filled night with top DJs & artists.",
      date: "March 25, 2025",
      location: "Indore, India",
      image: require("../assets/Slide1.png"),
    },
    {
      id: 2,
      name: "💻 Tech Conference",
      description: "Networking event for developers & startups.",
      date: "April 5, 2025",
      location: "Bangalore, India",
      image: require("../assets/Slide1.png"),
    },
  ]);

  return (
    <div className="home-container">
      {/* 🎟️ Banner Section */}
      <Banner />

      {/* 📅 Event Section */}
      <section className="events-section">
        <h2 className="section-title">🎉 Explore Upcoming Events</h2>
        <div className="event-list">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
