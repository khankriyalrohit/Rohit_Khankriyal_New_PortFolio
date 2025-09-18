const express = require("express");
const { addProject, getProjects, deleteProject } = require("../controllers/ProjectsSection");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Public
router.get("/", getProjects);

// Protected
router.post("/", adminAuth, addProject);
router.delete("/:id", adminAuth, deleteProject);

module.exports = router;
