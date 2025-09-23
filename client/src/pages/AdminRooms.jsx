import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  const load = () => API.get("/rooms").then((res) => setRooms(res.data));
  useEffect(load, []);

  const addRoom = async (e) => {
    e.preventDefault();
    await API.post("/rooms", { name, capacity, location });
    setName(""); setCapacity(""); setLocation("");
    load();
  };

  const remove = async (id) => {
    await API.delete(`/rooms/${id}`);
    load();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Admin – Rooms</h2>
      <form onSubmit={addRoom} className="space-y-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 rounded w-full"/>
        <input value={capacity} onChange={e=>setCapacity(e.target.value)} placeholder="Capacity" className="border p-2 rounded w-full"/>
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="border p-2 rounded w-full"/>
        <button className="p-2 bg-black text-white rounded">Add Room</button>
      </form>
      <ul>
        {rooms.map(r => (
          <li key={r._id} className="flex justify-between border p-2 rounded mt-2">
            {r.name} ({r.capacity}) – {r.location}
            <button onClick={()=>remove(r._id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
