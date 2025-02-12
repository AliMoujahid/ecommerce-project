// user.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();



// Get user profile (protected)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);  // Use the user ID from the token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT route for updating the profile (already existing)
router.put("/profile", protect, async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
