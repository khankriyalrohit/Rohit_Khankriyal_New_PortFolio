
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String], // array of strings
      required: true,
    },
    technologies: {
      type: [String], // array of tech names
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
