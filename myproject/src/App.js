import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import EventsFeed from "./components/EventsFeed"; // ✅ Added EventsFeed Import
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddEvent from "./components/Admin/AddEvent";
import OrganizerDashboard from "./components/Organizer/OrganizerDashboard";
import EditEvent from "./components/Organizer/EditEvent"; // ✅ Added Edit Event

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// ✅ Main Layout to Show/Hide Navbar & Footer
function MainLayout() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/edit-event");

  return (
    <>
      {/* ✅ Show Navbar/ Footer Except for Admin & Edit Event Pages */}
      {!hideNavbarAndFooter && <Navbar />}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<EventsFeed />} /> {/* ✅ Added Route */}
        <Route path="/profile" element={<Profile />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-event" element={<AddEvent />} />

        {/* ✅ Organizer Routes */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>

      {/* ✅ Show Footer Only for User/Organizer */}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
