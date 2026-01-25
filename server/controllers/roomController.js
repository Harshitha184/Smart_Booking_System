const Room = require("../models/Room");

// GET all rooms (Student + Admin)
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE room (Admin only)
exports.createRoom = async (req, res) => {
  try {
    const { name, capacity, location } = req.body;

    const room = await Room.create({ name, capacity, location });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE room (Admin only)
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
