const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate JWT token ✅ (this is where your code goes)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,   // make sure JWT_SECRET is set in .env
      { expiresIn: '1d' }
    );

    // 4️⃣ Send response with token
    res.status(200).json({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
