 import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

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
