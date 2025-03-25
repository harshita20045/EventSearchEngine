import React from "react";
import "../styles/Banner.css";
import Slide1 from "../assets/SlideC.jpg";
import Slide2 from "../assets/SlideD.avif";
import Slide3 from "../assets/SlideB.jpg";

// 🎨 Array to Define Carousel Slides
const slides = [
  { id: 1, src: Slide1, alt: "Find Amazing Events", caption: "Find Amazing Events 🎉" },
  { id: 2, src: Slide2, alt: "Book Tickets Instantly", caption: "Book Tickets Instantly 🎟" },
  { id: 3, src: Slide3, alt: "Enjoy Live Performances", caption: "Enjoy Live Performances 🎭" },
];

export default function Banner() {
  return (
    <div className="container-fluid p-0"> {/* ✅ No padding to eliminate unwanted gaps */}
      <div className="banner-container">
        {/* 🎟️ Carousel Container */}
        <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">

          {/* 🔢 Carousel Indicators */}
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* 📸 Carousel Items */}
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="5000"
              >
                <img src={slide.src} className="d-block w-100 banner-img" alt={slide.alt} />
                <div className="carousel-caption">
                  <h2>{slide.caption}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* ⏪ Prev & ⏩ Next Buttons */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#eventCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#eventCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
