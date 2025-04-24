import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css"; // Ensure correct import

export default function Navbar() {
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, [location]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("role");
    setUserRole(null);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="custom-navbar-container">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            🎟 Eventista
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              {userRole === "organizer" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/add-event">Add Event</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
            </ul>

            <form className="d-flex search-bar" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">🔍</button>
            </form>

            {userRole ? (
              <div className="nav-item dropdown">
                <button className="btn profile-btn dropdown-toggle" data-bs-toggle="dropdown">
                  Profile
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/profile">Your Profile</Link></li>
                  <li><button className="dropdown-item logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn btn-login" to="/login">Login</Link>
                <Link className="btn btn-register" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
