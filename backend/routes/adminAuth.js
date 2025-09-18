// routes/adminAuth.js
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { passcode } = req.body;
  if (!passcode) return res.status(400).json({ message: "Passcode required" });

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(401).json({ message: "Invalid passcode" });
  }

  const token = jwt.sign(
    { role: "admin" }, // payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return res.json({ token });
});

module.exports = router;
