const Booking = require("../models/Booking");


// STUDENT: Create booking
exports.createBooking = async (req, res) => {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    return res.status(400).json({ message: "Cannot book past dates" });
  }
  try {
    const { room, date, timeSlot } = req.body;

    

    const exists = await Booking.findOne({ room, date, timeSlot });
    if (exists) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      room,
      date,
      timeSlot,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STUDENT: My bookings;

exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only owner can cancel
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ ADMIN: View ALL bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("room", "name location");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getBookingsByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const bookings = await Booking.find({ date })
    .populate("room")
    .populate("user", "name email");

  res.json(bookings);
};


