const Experience = require("../models/ExperienceSection");

// @desc   Get all experiences
// @route  GET /api/experience
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Add new experience
// @route  POST /api/experience
exports.addExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const saved = await experience.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete an experience
// @route  DELETE /api/experience/:id
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
