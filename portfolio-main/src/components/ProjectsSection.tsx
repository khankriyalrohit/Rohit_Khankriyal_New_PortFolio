import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    description: "Developed a dynamic and responsive e-commerce platform using React and styled with Tailwind CSS. Features include product catalog, shopping cart, user authentication, and payment integration.",
    fullDescription: "This comprehensive e-commerce platform showcases modern web development practices with React hooks, context API for state management, and responsive design principles. The project includes advanced features like product filtering, wishlist functionality, order tracking, and admin dashboard for inventory management.",
    technologies: ["React", "Javascript", "Node.js", "MongoDB"],
    liveLink: "https://cart-zone.onrender.com/",
    codeLink: "https://github.com/khankriyalrohit/CartZone-Ecoomerce-Website"
  },
  {
    id: 2,
    title: "CeisZyc",
    image: "https://th.bing.com/th/id/OIP.cgb2oEHnmaC9H0KhZdXO7AHaEK?rs=1&pid=ImgDetMain",
    description: "Created an interactive and responsive Fest Website for Annual Fest of THDC-IHET 2024.",
    fullDescription: "CEISZYC is the festival website of THDC-IHET college. It enables event highlights, event participation applications, and serves other fest website functionalities.",
    technologies: ["React", "Javascript", "Node.js", "MongoDB"],
    liveLink: "https://ceiszyc-rohit-khankriyal.onrender.com/",
    codeLink: "https://github.com/khankriyalrohit/Ceiszyc_Fest_Website"
  },
  {
    id: 3,
    title: "Potato Disease Classification",
    image: "https://imgs.search.brave.com/peGCNO8N14Kmlv9-S88O7FeHINd_o0Os3HXn4EEPBEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDA5Mjc1NTA2NDct/NDM2OTljYjE0OTE2/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhOWHg4ZkdWdWZE/QjhmSHg4ZkE9PQ",
    description: "React project integrating convolutional neural networks to classify potato plants as healthy or unhealthy.",
    fullDescription: "Potato Disease Classification is a deep learning-based project that uses TensorFlow convolutional layers for plant health detection. The frontend is built in React, backend in NodeJS, and training done in Jupyter Notebook.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "Jupyter Notebook"],
    liveLink: "https://ceiszyc-rohit-khankriyal.onrender.com/",
    codeLink: "https://github.com/khankriyalrohit/Potato_Disease_Classification"
  },
  {
    id: 4,
    title: "FiCoNet (Fire-Control-Network)",
    image: "https://imgs.search.brave.com/-cGeOofO-9bBLNwAQhylpaGKU99oxWJWh5G-Qak7JN4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmh2LnJzL2Rwbmcv/ZC80NDUtNDQ1ODcy/MF91dHRhcmFraGFu/ZC1nb3Zlcm5tZW50/LWxvZ28taGQtcG5n/LWRvd25sb2FkLnBu/Zw",
    description: "Internship project under Uttarakhand government — Harnessing IoT to mitigate forest fire damage.",
    fullDescription: "FiCoNet is an IoT-based system using ESP32, MQ2 smoke sensor, and web interface to detect forest fires. The data is sent to the cloud and displayed in real-time on a React-based dashboard.",
    technologies: ["Arduino IDE", "ESP32", "MQ2 Smoke Sensor", "React", "Node.js", "MongoDB"],
    liveLink: "https://ficonet-thdc-ihet-prototype.onrender.com/",
    codeLink: "https://github.com/khankriyalrohit/FiCoNet_ProtoType"
  },
  {
    id: 5,
    title: "GateGuard (Entry Management System)",
    image: "https://cms.jeevanutsav.com/wp-content/uploads/2020/10/logo_0.png",
    description: "Internship project under THDC-India-Limited — Building an entry and appointment management system.",
    fullDescription: "GateGuard is a secure entry and appointment management system for THDC-India-Limited's IT Department in Rishikesh. Built using React, NodeJS, MongoDB, and Vonage API for notifications.",
    technologies: ["Vonage/Nexmo", "React", "JavaScript", "Node.js", "MongoDB"],
    liveLink: "https://khankriyal-rohit-gateguard.onrender.com/",
    codeLink: "https://github.com/khankriyalrohit/GateGuard"
  }
];

  const [startIndex, setStartIndex] = useState(0);
  

// Number of projects to show at once
  const visibleCount = 3;

  // Function to get the visible projects array based on startIndex and visibleCount (circular)
  const getVisibleProjects = () => {
    const visibleProjects = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % projects.length;
      visibleProjects.push(projects[index]);
    }
    return visibleProjects;
  };

  // Handle left arrow click - move carousel window backward
  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setHoveredProject(null); // reset hovered
  };

  // Handle right arrow click - move carousel window forward
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % projects.length);
    setHoveredProject(null); // reset hovered
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Projects currently visible in the carousel window
  const visibleProjects = getVisibleProjects();

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          {/* Project Details Container */}
          <motion.div
            variants={itemVariants}
            className="mb-12 min-h-[200px] card-gradient p-8 rounded-xl border border-border"
          >
            {hoveredProject !== null ? (
              <div className="fade-in">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {visibleProjects[hoveredProject].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {visibleProjects[hoveredProject].fullDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {visibleProjects[hoveredProject].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                    <a href={visibleProjects[hoveredProject].liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={visibleProjects[hoveredProject].codeLink} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-lg">Hover over a project to see details</p>
              </div>
            )}
          </motion.div>

          {/* Projects Grid - only show 3 at a time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.div variants={itemVariants} className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;