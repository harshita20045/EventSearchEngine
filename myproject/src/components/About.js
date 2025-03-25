import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>🎉 About Our Event Search Platform</h1>
        <p>Your gateway to discovering amazing events near you!</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>🌍 Our Mission</h2>
          <p>
            We aim to make event discovery effortless by connecting people to concerts, festivals, and workshops
            happening around them.
          </p>
        </section>

        <section className="about-section">
          <h2>🎟 What We Offer</h2>
          <ul>
            <li>🔍 Find events easily with our advanced search</li>
            <li>🎭 Discover concerts, sports, and festivals</li>
            <li>📅 Get event reminders and notifications</li>
            <li>🚀 Organizers can create & promote their events</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📢 Why Choose Us?</h2>
          <p>
            We bring communities together by making events more accessible to everyone.
            Whether you’re a visitor or an event organizer, we have the tools you need.
          </p>
        </section>
      </div>
    </div>
  );
}
