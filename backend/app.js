const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

// App using these functionalities from various packages
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// config
dotenv.config({ path: "./config/config.env" });

// Routes
const heroRoutes = require("./routes/HeroSection");
const skillRoutes = require("./routes/SkillsSection");
const experienceRoutes = require("./routes/ExperienceSection");
const projectRoutes = require("./routes/ProjectsSection");
const adminAuthRoutes = require("./routes/adminAuth");
// Using routes

app.use("/api/hero", heroRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminAuthRoutes);


module.exports = app;

