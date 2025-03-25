import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* 🔹 Social Media Links */}
      <section className="social-media">
        <p>Follow us on:</p>
        <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-facebook-f"></i>
</a>
<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-twitter"></i>
</a>
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-instagram"></i>
</a>
<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-linkedin"></i>
</a>
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-github"></i>
</a>

        </div>
      </section>

      {/* 🔹 Footer Content & Links */}
      <div className="footer-content">
        <div className="footer-section">
          <h4>🎟 Event Search Engine</h4>
          <p>Discover and book amazing events near you!</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Upcoming Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/services">Help & Support</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 Indore, MP, India</p>
          <p>📧 <a href="mailto:support@eventsearch.com">support@eventsearch.com</a></p>
          <p>📞 <a href="tel:+919876543210">+91 9876543210</a></p>
        </div>
      </div>

      {/* 🔹 Copyright Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Event Search Engine. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
