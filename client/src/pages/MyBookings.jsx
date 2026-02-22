<<<<<<< HEAD
import API from "../api/axios";
import { useEffect, useState } from "react";
=======
 import { useEffect, useState } from "react";
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

<<<<<<< HEAD
  const fetchBookings = async () => {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await API.delete(`/bookings/${id}`);
    alert("Booking cancelled");
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
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
    </div>
  );
}
=======
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mockBookings")) || [];
    setBookings(data);
  }, []);

  const cancelBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("mockBookings", JSON.stringify(updated));
  };

     return (
      <div className="page-fade">

  <div>
    <h2 style={{ marginBottom: "20px" }}>My Bookings</h2>

    {bookings.length === 0 && <p>No bookings yet</p>}

    <div className="dashboard-grid">
     {bookings.map((b, index) => (
  <div
    key={b._id ?? b.id ?? index}
    className="dashboard-card"
  >
    <p><strong>Date:</strong> {b.date}</p>
    <p>
      <strong>Time:</strong> {b.startTime} – {b.endTime}
    </p>
  </div>
))}



    </div>
  </div>
  </div>
);



}
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
