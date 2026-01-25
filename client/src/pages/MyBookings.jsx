import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/me").then((res) => setBookings(res.data));
  }, []);

  const cancel = async (id) => {
    await API.delete(`/bookings/${id}`);
    setBookings(bookings.filter((b) => b._id !== id));
  };

  return (
  <div className="mybookings-container">
    <h2>My Bookings</h2>
    <table>
      <thead>
        <tr>
          <th>Room</th>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b._id}>
            <td>{b.roomId?.name}</td>
            <td>{b.date}</td>
            <td>{b.startTime} - {b.endTime}</td>
            <td>
              <button onClick={() => cancel(b._id)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
