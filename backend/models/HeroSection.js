
const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema(
  {
    texts: {
      type: [String], // array of strings like ["Web Developer", "Deep Learning Beginner"]
      required: true,
    },
    summary: {
      type: String, // single summary text
      required: true,
      trim: true,
    },
    about: {
      type: String, // single about paragraph
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSection", heroSectionSchema);
