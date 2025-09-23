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
    <div className="p-6">
      <h2 className="text-xl font-bold">My Bookings</h2>
      <table className="w-full border mt-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Room</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="border p-2">{b.roomId?.name}</td>
              <td className="border p-2">{b.date}</td>
              <td className="border p-2">
                {b.startTime} - {b.endTime}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => cancel(b._id)}
                  className="text-red-600"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
