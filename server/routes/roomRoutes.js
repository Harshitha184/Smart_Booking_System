const express = require("express");
const router = express.Router();

const {
  getRooms,
  createRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public / Studen
router.get("/", protect, getRooms);

// Admin only
router.post("/", protect, adminOnly, createRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;
