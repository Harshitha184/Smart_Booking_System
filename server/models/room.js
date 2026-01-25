const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
