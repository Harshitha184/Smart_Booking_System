 import { useState } from "react";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

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

      {/* Add Room Form */}
      <form onSubmit={addRoom} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button>Add Room</button>
      </form>

      {/* Rooms List */}
      {rooms.length === 0 && <p>No rooms added yet</p>}

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>{room.name}</strong></p>
          <p>Capacity: {room.capacity}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
