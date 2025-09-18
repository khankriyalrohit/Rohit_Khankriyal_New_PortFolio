const express = require("express");
const router = express.Router();
const {
  getHeroSection,
  updateHeroSection,
} = require("../controllers/HeroSection");

const adminAuth = require("../middlewares/adminAuth");

// Public
router.get("/", getHeroSection);

// Protected
router.put("/", adminAuth, updateHeroSection);

module.exports = router;
