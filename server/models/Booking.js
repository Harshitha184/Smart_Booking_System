const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true }, // e.g., hotel room, car, salon
  date: { type: Date, required: true },
  status: { type: String, default: "pending" } // pending, confirmed, cancelled
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
