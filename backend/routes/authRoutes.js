// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Import user model
const User = require('../models/user');

// Register API
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation checks
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create new user
    const newUser = await User.create(name, email, password, role);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login API (Example of a simple login route)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation checks
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user by email
  const user = User.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  res.status(200).json({ message: "Login successful", user });
});

module.exports = router;
