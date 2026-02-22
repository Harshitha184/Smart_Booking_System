import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";

<<<<<<< HEAD
export default function AdminBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: date ? { date } : {},
      });

      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchBookings();
    }
  }, [user]);

  const cancelBooking = async (id) => {
    await API.delete(`/bookings/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    fetchBookings();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – All Bookings</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchBookings}>Filter</button>

=======
 export default function AdminBookings() {
  // Mock bookings (frontend-only)
  const bookings = [
    {
      id: 1,
      room: "Conference Room",
      user: "Student A",
      date: "2025-01-10",
      time: "10:00 - 11:00",
    },
    {
      id: 2,
      room: "Lab 1",
      user: "Student B",
      date: "2025-01-10",
      time: "11:00 - 12:00",
    },
  ];

  return (
    <div className="page-fade">

    <div style={{ padding: "20px" }}>
      <h2>Admin – View Bookings</h2>

>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
<<<<<<< HEAD
          key={b._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>
            <b>User:</b> {b.user?.name} ({b.user?.email})
          </p>
          <p>
            <b>Room:</b> {b.room?.name}
          </p>
          <p>
            <b>Date:</b> {b.date}
          </p>
          <p>
            <b>Time:</b> {b.startTime} - {b.endTime}
          </p>

          <button onClick={() => cancelBooking(b._id)}>
            Cancel Booking
          </button>
        </div>
      ))}
=======
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p><strong>Room:</strong> {b.room}</p>
          <p><strong>User:</strong> {b.user}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Time:</strong> {b.time}</p>
        </div>
      ))}
    </div>
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
    </div>
  );
}