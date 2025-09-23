import React, { useState } from "react";
import API from "../api/axios";

export default function AdminBookings() {
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetch = async () => {
    const res = await API.get(`/bookings?date=${date}`);
    setBookings(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin – Bookings</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button onClick={fetch} className="p-2 bg-blue-600 text-white rounded">
        Load Bookings
      </button>

      <table className="w-full border mt-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="border p-2">{b.userId?.email}</td>
              <td className="border p-2">{b.roomId?.name}</td>
              <td className="border p-2">
                {b.date} {b.startTime}-{b.endTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
