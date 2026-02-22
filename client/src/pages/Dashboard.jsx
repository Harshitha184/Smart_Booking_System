<<<<<<< HEAD
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") {
    return <Navigate to="/admin/rooms" />;
  }

  return <Navigate to="/rooms" />;
=======
 import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaDoorOpen, FaClipboardList } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="dashboard-page page-fade">
      <h1 className="dashboard-title">
        Welcome {user?.name || "User"} 👋
      </h1>
      <p className="dashboard-subtitle">
        What would you like to do today?
      </p>

      <div className="dashboard-grid">
        {/* ROOMS CARD */}
         <div
  className="dashboard-card"
  onClick={() => navigate("/rooms")}
>

          <FaDoorOpen size={32} style={{ marginBottom: "10px" }} />
          <h3>Available Rooms</h3>
          <p>Browse and book available rooms</p>
        </div>

        {/* BOOKINGS CARD */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/my-bookings")}
        >
          <FaClipboardList size={32} style={{ marginBottom: "10px" }} />
          <h3>My Bookings</h3>
          <p>View your booked rooms</p>
        </div>
      </div>
    </div>
  );
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
}
