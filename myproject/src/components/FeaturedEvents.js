import React from "react";
import "../styles/FeaturedEvents.css";

const events = [
  { id: 1, title: "Music Concert 🎵", description: "Experience the best live music in town!" },
  { id: 2, title: "Food Festival 🍔", description: "Enjoy delicious cuisines from top chefs!" },
  { id: 3, title: "Tech Conference 💻", description: "Learn from top industry experts!" },
];

export default function FeaturedEvents() {
  return (
    <section className="featured-events">
      <h2>🎉 Featured Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
