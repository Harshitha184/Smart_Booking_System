const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Booking routes are working 🚀" });
});

module.exports = router;

