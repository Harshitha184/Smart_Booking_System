import React, { useState } from "react";
import API from "../api/axios";

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

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
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
    </div>
  );
}
