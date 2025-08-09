import React from "react";
import "./Cubes.css";

const SkillBox = ({ images }) => {
  return (
    <div className="skillbox">
      {images.map((img, index) => (
        <div className={`skillbox-side skillbox-side-${index + 1}`} key={index}>
          <img src={img} alt={`Skill ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

const HexaSkills3D = () => {
  // Replace with your PNG icons later
const placeholders1 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", // React
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", // JavaScript
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", // HTML
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", // CSS
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", // Tailwind CSS
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", // Node.js
];

const placeholders2 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", // MongoDB
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", // Python
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", // TensorFlow
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", // Git
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", // GitHub
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", // Express.js
];

  return (
    <div className="skills3d-container">
      <div className="skills3d-wrapper">
        <SkillBox images={placeholders1} />
      </div>
      <div className="skills3d-wrapper">
        <SkillBox images={placeholders2} />
      </div>
    </div>
  );
};

export default HexaSkills3D;
