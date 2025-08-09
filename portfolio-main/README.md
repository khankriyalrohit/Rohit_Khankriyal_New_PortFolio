
# React Rohit Khankriyal Portfolio Website

A modern, responsive, and professional portfolio website built with React. Showcases projects, skills, and experiences in a clean and interactive design optimized for all screen sizes.

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Customization](#customization)
* [Contributing](#contributing)
* [License](#license)

---

## Demo

[Live Demo Link](https://your-portfolio-live-link.com) *(Replace with your deployed URL)*

---

## Features

* Responsive design for desktop, tablet, and mobile
* Smooth animations and interactive UI components
* Projects section with detailed descriptions and links to live demos and source code
* Skills section showcasing technology icons with 3D animations
* Contact form with validation (if included)
* Dark and light theme toggle (optional)
* SEO friendly and optimized for performance

---

## Technologies Used

* React (with functional components and hooks)
* Tailwind CSS for styling
* Framer Motion for animations
* React Router (if applicable)
* React Icons / Lucide-react for icons
* Other dependencies: clsx, tailwind-merge, etc.

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit

   ```
   http://localhost:3000
   ```

---

## Usage

* Edit project details in `src/data/projects.js` (or wherever you store your project data)
* Customize skills and other sections similarly
* Replace images and icons with your own assets
* Adjust styles and animations in the component files and Tailwind config

---

## Project Structure

```
src/
├── components/         # Reusable React components (ProjectCard, SkillBox, Navbar, etc.)
├── data/               # Data files for projects, skills, experience
├── pages/              # Page components (Home, About, Contact)
├── styles/             # Tailwind CSS and global styles
├── App.jsx             # Main app component
└── index.jsx           # ReactDOM render entry
```

---

## Customization

* **Theme:** Modify Tailwind config or add dark mode toggle in `App.jsx`
* **Animations:** Update or add animations using Framer Motion in components
* **Content:** Update your projects, skills, and personal info in the data files
* **SEO:** Add React Helmet or similar for meta tags if needed

---
