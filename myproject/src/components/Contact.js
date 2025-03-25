import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      {/* 🔹 Contact Header */}
      <div className="contact-header">
        <h1>📞 Get in Touch</h1>
        <p>We'd love to hear from you! Reach out anytime.</p>
      </div>

      {/* 🔹 Contact Content */}
      <div className="contact-content">
        {/* 📍 Office Info */}
        <section className="contact-info">
          <h2>📍 Our Office</h2>
          <p>123 Event Street, Indore, India</p>
          <p>📧 <a href="mailto:support@eventsearch.com">support@eventsearch.com</a></p>
          <p>📞 <a href="tel:+919876543210">+91 98765 43210</a></p>
        </section>

        {/* ✉ Contact Form */}
        <section className="contact-form">
          <h2>✉ Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
}
