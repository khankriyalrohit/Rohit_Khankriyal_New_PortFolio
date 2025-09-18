// models/SkillSection.js

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const skillSectionSchema = new mongoose.Schema(
  {
    skills: {
      type: [skillSchema], // array of {title, description}
      default: [],
    },
    placeholders1: {
      type: [String], // array of image URLs
      default: [],
    },
    placeholders2: {
      type: [String], // array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillSection", skillSectionSchema);
