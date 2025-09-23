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
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Rooms</h2>
      <ul>
        {rooms.map((r) => (
          <li key={r._id} className="border p-2 rounded mb-2">
            <strong>{r.name}</strong> – Capacity {r.capacity} – {r.location}
          </li>
        ))}
      </ul>

      <form onSubmit={book} className="space-y-2">
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select room</option>
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded">
          Book Room
        </button>
        {msg && <div className="text-green-600">{msg}</div>}
      </form>
    </div>
  );
}
