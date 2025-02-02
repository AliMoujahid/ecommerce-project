// auth.js
const express = require("express");
const { registerUser, loginUser, protectRoute } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Protected route (needs JWT token)
router.get("/protected", protect , protectRoute);

module.exports = router;
