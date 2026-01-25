const express = require("express");
const router = express.Router();

const {
  createBooking,
  myBookings,
  getAllBookings,
  cancelBooking 
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


// Student routes
router.post("/", protect, createBooking);

router.get("/my", protect, myBookings);



// Admin route

router.get(
  "/admin",
  protect,
  adminOnly,
  getAllBookings
);

router.delete("/:id", protect, cancelBooking);



module.exports = router;
