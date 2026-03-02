import API from "../api/axios";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Bookings</h1>
        <p className="dashboard-subtitle">
          View and manage your reservations
        </p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="dashboard-card text-center">
          <p className="text-slate-600">No bookings found</p>
        </div>
      )}

      {/* BOOKINGS GRID */}
      <div className="dashboard-grid">
         {bookings.map((b) => {
  const isPast = new Date(b.date) < new Date();

  return (
    <div key={b._id} className="dashboard-card">

            <div className="flex justify-between items-center mb-2">
  <h3 className="text-lg font-semibold">
    {b.room?.name}
  </h3>

  <span
    className={`text-xs px-3 py-1 rounded-full font-medium ${
      isPast
        ? "bg-gray-200 text-gray-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    {isPast ? "Completed" : "Active"}
  </span>
</div>

            <p className="text-slate-600 mb-1">
              📅 Date: <strong>{b.date}</strong>
            </p>

            <p className="text-slate-600 mb-4">
              ⏰ Time: <strong>{b.startTime} - {b.endTime}</strong>
            </p>

            <button
              onClick={() => cancelBooking(b._id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Cancel Booking
            </button>

          </div>
  );
})}
      </div>

    </div>
  );
}