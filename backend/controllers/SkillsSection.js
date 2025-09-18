
const SkillSection = require("../models/SkillsSection");

// @desc   Get Skill Section data
// @route  GET /api/skills
// @access Public
exports.getSkillSection = async (req, res) => {
  try {
    const skills = await SkillSection.findOne();
    if (!skills) {
      return res.status(404).json({ message: "Skill section not found" });
    }
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update Skill Section data (replace old with new)
// @route  PUT /api/skills
// @access Admin
exports.updateSkillSection = async (req, res) => {
  try {
    const { skills, placeholders1, placeholders2 } = req.body;

    let skillSection = await SkillSection.findOne();

    if (!skillSection) {
      // Create new record if not exists
      skillSection = new SkillSection({ skills, placeholders1, placeholders2 });
    } else {
      // Update existing record
      skillSection.skills = skills;
      skillSection.placeholders1 = placeholders1;
      skillSection.placeholders2 = placeholders2;
    }

    const updatedSkillSection = await skillSection.save();
    res.json(updatedSkillSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
