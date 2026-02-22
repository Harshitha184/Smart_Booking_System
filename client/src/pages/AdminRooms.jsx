<<<<<<< HEAD
import { useEffect, useState } from "react";
import API from "../api/axios";
=======
 import { useState } from "react";
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
<<<<<<< HEAD
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // Load rooms from backend
  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      setError("Failed to load rooms");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Create room (ADMIN)
  const addRoom = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !capacity || !location) {
      setError("All fields are required");
      return;
    }

    try {
      await API.post("/rooms", { name, capacity, location });
      setName("");
      setCapacity("");
      setLocation("");
      fetchRooms(); // refresh list
    } catch (err) {
      setError("Only admin can add rooms");
    }
  };

  // Delete room (ADMIN)
  const deleteRoom = async (id) => {
    try {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – Manage Rooms</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

=======

  const addRoom = (e) => {
    e.preventDefault();

    if (!name || !capacity) {
      alert("Please fill all fields");
      return;
    }

    const newRoom = {
      id: Date.now(),
      name,
      capacity,
    };

    setRooms([...rooms, newRoom]);
    setName("");
    setCapacity("");
  };

  return (
    <div className="page-fade">

    <div style={{ padding: "20px" }}>
      <h2>Admin – Manage Rooms</h2>

>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
      {/* Add Room Form */}
      <form onSubmit={addRoom} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
=======
          style={{ marginRight: "10px" }}
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
<<<<<<< HEAD
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
=======
          style={{ marginRight: "10px" }}
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
        />

        <button>Add Room</button>
      </form>

      {/* Rooms List */}
<<<<<<< HEAD
      {rooms.length === 0 && <p>No rooms found</p>}

      {rooms.map((room) => (
        <div
          key={room._id}
=======
      {rooms.length === 0 && <p>No rooms added yet</p>}

      {rooms.map((room) => (
        <div
          key={room.id}
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>{room.name}</strong></p>
          <p>Capacity: {room.capacity}</p>
<<<<<<< HEAD
          <p>Location: {room.location}</p>
          <button onClick={() => deleteRoom(room._id)}>Delete</button>
        </div>
      ))}
=======
        </div>
      ))}
    </div>
>>>>>>> 8b86cb27bdedb488488f98b6633d1d75248945a2
    </div>
  );
}
