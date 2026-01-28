 import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      alert("Please select date and time");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    const newBooking = { date, startTime, endTime };

    const existing =
      JSON.parse(localStorage.getItem("mockBookings")) || [];
    localStorage.setItem(
      "mockBookings",
      JSON.stringify([...existing, newBooking])
    );

    navigate("/my-bookings");
  };

  return (
    <div className="page-fade rooms-page">
      <h2 className="rooms-title">Book a Room</h2>

      <div className="rooms-container">
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <button>Book</button>
        </form>
      </div>
    </div>
  );
}
