import { Link } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout-container">
      <nav className="navbar">
        <h1 className="logo">Smart Booking System</h1>
        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Welcome to Smart Booking System 🎉</h2>
        <p>
          Manage your room bookings efficiently, avoid double bookings, 
          and ensure smooth scheduling with our smart system.
        </p>
      </div>
    </div>
  );
}

export default Layout;
