const express = require("express");
const router = express.Router();
const {
  getExperiences,
  addExperience,
  deleteExperience,
} = require("../controllers/ExperienceSection");

const adminAuth = require("../middlewares/adminAuth");

// Public
router.get("/", getExperiences);

// Protected
router.post("/", adminAuth, addExperience);
router.delete("/:id", adminAuth, deleteExperience);

module.exports = router;
