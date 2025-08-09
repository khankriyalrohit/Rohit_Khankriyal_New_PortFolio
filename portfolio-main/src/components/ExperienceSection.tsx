import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    
    {
      title: "Software Developer",
      company: "District Mangistrate Office - Tehri",
      location: "Tehri , Uttarakhand , India",
      duration: "Jun 2024 - Sep 2024",
      description: [
          "Developed FiCoNet, an IoT-based forest fire detection system using ESP32 microcontroller and MQ-2 smoke sensor",
          "Integrated GPS and cloud storage to transmit real-time fire alerts and location data",
          "Built a React-based dashboard to visualize sensor data, fire locations, and nearby resources",
          "Optimized device power consumption and implemented 6-hour fire detection persistence"
        ],
      technologies: ["ESP32", "MQ-2 Sensor", "React", "Node.js", "MongoDB", "Cloudinary"]
    },
    {
      title: "Web Development Intern",
      company: "THDC-Rishikesh",
      location: "Rishikesh, Uttarakhand , India",
      duration: "03 Jan 2024 – 04 Feb 2024",
      description: [
        "Developed an Appointment Management Website facilitating visitors to schedule meetings with offices.",
        "Maintained comprehensive IN/OUT records for efficient tracking and management.",
        "Implemented responsive design with React and managed state using Redux.",
        "Integrated backend services with Node.js, Express, and MongoDB.",
        "Added SMS notifications via Nexmo/Vonage API."
      ],
      technologies: ["React", "MongoDB", "Redux", "Node.js", "Express", "Nexmo/Vonage"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and key experiences that have shaped my development skills
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 z-10 mt-6">
                  <div className="w-full h-full bg-primary rounded-full animate-ping absolute"></div>
                  <div className="w-full h-full bg-primary rounded-full relative"></div>
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}>
                  <div className="card-gradient p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {experience.title}
                        </h3>
                        <p className="text-primary font-semibold mb-2">
                          {experience.company}
                        </p>
                      </div>
                      <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {experience.location}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;