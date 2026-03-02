import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3 className="nav-brand">Smart Booking</h3>

      <div className="nav-links">

        {/* 🔹 UPDATED LINKS */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/Profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Profile
        </NavLink>

        {/* ✅ ADMIN LINKS (UNCHANGED) */}
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/admin/rooms"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Admin Rooms
            </NavLink>

            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Admin Bookings
            </NavLink>
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}