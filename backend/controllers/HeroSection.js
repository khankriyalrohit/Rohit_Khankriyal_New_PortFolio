
const HeroSection = require('../models/HeroSection');

// @desc   Get Hero Section data
// @route  GET /api/hero
// @access Public

exports.getHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.findOne(); // fetch the only hero section
    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update Hero Section data (replace old with new)
// @route  PUT /api/hero
// @access Admin


exports.updateHeroSection = async (req, res) => {
  try {
    const { texts, summary, about } = req.body;

    let hero = await HeroSection.findOne();

    if (!hero) {
      // If no record exists, create one
      hero = new HeroSection({ texts, summary, about });
    } else {
      // Update existing record
      hero.texts = texts;
      hero.summary = summary;
      hero.about = about;
    }

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
