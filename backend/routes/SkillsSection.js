const express = require("express");
const router = express.Router();
const {
  getSkillSection,
  updateSkillSection,
} = require("../controllers/SkillsSection");

const adminAuth = require("../middlewares/adminAuth");

// Public
router.get("/", getSkillSection);

// Protected
router.put("/", adminAuth, updateSkillSection);

module.exports = router;
