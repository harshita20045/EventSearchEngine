import React from "react";
import "../styles/Services.css";

const services = [
  { id: 1, title: "🔍 Event Discovery", description: "Search & filter events by category, date, and location." },
  { id: 2, title: "🎟 Easy Booking", description: "Book event tickets quickly with secure payment options." },
  { id: 3, title: "📢 Event Promotion", description: "Organizers can promote their events to reach a bigger audience." },
  { id: 4, title: "📅 Create Your Event", description: "Easily create and manage your events on our platform." },
  { id: 5, title: "📧 Notifications & Alerts", description: "Get event reminders & personalized recommendations." },
];

const helpOptions = [
  { id: 1, title: "📜 FAQs", description: "Check our frequently asked questions for quick solutions." },
  { id: 2, title: "📩 Contact Support", description: "Reach out to our support team for any issues." },
  { id: 3, title: "💬 Live Chat", description: "Get instant assistance via live chat." },
];

export default function Services() {
  return (
    <div className="services-container">
      {/* ✅ Services Section */}
      <div className="services-header">
        <h1>🎟 Our Services</h1>
        <p>Discover the amazing features we provide to make event exploration easy.</p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {/* ✅ Help & Support Section */}
      <div className="help-header">
        <h1>❓ Need Help?</h1>
        <p>Find answers to common questions or contact our support team.</p>
      </div>

      <div className="help-list">
        {helpOptions.map((help) => (
          <div key={help.id} className="help-item">
            <h2>{help.title}</h2>
            <p>{help.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
