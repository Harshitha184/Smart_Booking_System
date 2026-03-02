 import { useEffect, useState } from "react";
 import toast from "react-hot-toast";
import API from "../api/axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* Fetch rooms */
  useEffect(() => {
    API.get("/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms"));
  }, []);

  /* Fetch booked slots */
  useEffect(() => {
    if (selectedRoom && date) {
      API.get(`/bookings/room/${selectedRoom._id}?date=${date}`)
        .then((res) => setBookedSlots(res.data))
        .catch(() => setBookedSlots([]));
    }
  }, [selectedRoom, date]);

  /* Book room */
  const bookRoom = async () => {
    setError("");
    setSuccess("");
    

    if (!date || !startTime || !endTime)
      return setError("Please select date and time");

    if (startTime >= endTime)
      return setError("End time must be after start time");

    try {
      await API.post("/bookings", {
        room: selectedRoom._id,
        date,
        startTime,
        endTime,
      });

      toast.success("*Room booked successfully!✅*");
      setStartTime("");
      setEndTime("");

      const res = await API.get(
        `/bookings/room/${selectedRoom._id}?date=${date}`
      );
      setBookedSlots(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed❌");
    }
  };

   return (
  <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">
    
    {/* HEADER */}
    <div className="dashboard-header">
      <h1 className="dashboard-title">Available Rooms</h1>
      <p className="dashboard-subtitle">
        Browse and book available rooms
      </p>
    </div>

    {error && <p className="text-red-600 mb-3">{error}</p>}
    {success && <p className="text-green-600 mb-3">{success}</p>}

    {/* 🟣 DASHBOARD GRID STYLE */}
    <div className="dashboard-grid">
      {rooms.map((room) => (
        <div key={room._id} className="dashboard-card">
          
          <h3 className="text-lg font-semibold mb-2">
            {room.name}
          </h3>

          <p className="text-slate-600 mb-1">
            👥 Capacity: <strong>{room.capacity}</strong>
          </p>

          <p className="text-slate-600 mb-4">
            📍 Location: <strong>{room.location}</strong>
          </p>

          <button
            onClick={() => setSelectedRoom(room)}
            className="w-full"
          >
            Book Room
          </button>
        </div>
      ))}
    </div>

    {/* 🟣 BOOKING MODAL (UNCHANGED LOGIC) */}
     {selectedRoom && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
      
      <h3 className="text-xl font-semibold mb-4">
        Book {selectedRoom.name}
      </h3>

      {/* Date */}
      <label className="block mb-2 font-medium">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Start Time */}
      <label className="block mb-2 font-medium">Start Time</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* End Time */}
      <label className="block mb-2 font-medium">End Time</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Blocked Slots */}
      {date && bookedSlots.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold mb-1 text-red-600">
            Blocked Slots🚫
          </p>
          {bookedSlots.map((b) => (
            <p key={b._id} className="text-sm text-red-500">
              {b.startTime} - {b.endTime}
            </p>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={bookRoom}
          className="flex-1"
        >
          Confirm
        </button>

        <button
          onClick={() => {
            setSelectedRoom(null);
            setBookedSlots([]);
            setDate("");
          }}
          className="flex-1 border border-gray-400 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
  </div>
);
}