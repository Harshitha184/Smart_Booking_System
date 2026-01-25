import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [roomId, setRoomId] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/rooms").then((res) => setRooms(res.data));
  }, []);

  const book = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", { roomId, date, startTime, endTime });
      setMsg("Booking successful!");
    } catch (e) {
      setMsg(e.response?.data?.msg || "Booking failed");
    }
  };

return (
  <div className="rooms-container">
    <h2>Rooms</h2>
    <ul>
      {rooms.map((r) => (
        <li key={r._id}>
          <strong>{r.name}</strong> – Capacity {r.capacity} – {r.location}
        </li>
      ))}
    </ul>

    <form onSubmit={book}>
      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        <option value="">Select room</option>
        {rooms.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <button>Book Room</button>
      {msg && <div className="msg">{msg}</div>}
    </form>
  </div>
);
}
