import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const education = [
  {
    degree: "Bachelor of Technology (Computer Science and Engineering)",
    institution: "Tehri Hydro Development Corporation - Institute of Hydropower Engineering and Technology",
    location: "Tehri Garhwal, Uttarakhand, India",
    duration: "Sept 2021 - July 2025",
    grade: "CGPA: 8.0/10",
    achievements: [
      "Recently graduated CSE student specializing in development and deep learning",
      "Proficient in Data Structures & Algorithms, Computer Networks, DBMS, and DAA",
      "Committed to continuous learning and advancement in emerging technologies"
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Database Management Systems",
      "Design & Analysis of Algorithms",
      "Deep Learning",
      "Web Development"
    ]
  },
  {
    degree: "Intermediate in Science (Physics, Chemistry, Mathematics)",
    institution: "Olympus High School",
    location: "Dehradun, Uttarakhand, India",
    duration: "Mar 2020 - July 2021",
    grade: "94.8%",
    achievements: [
      "Studied PCM with Computer Science as an additional subject",
      "Actively participated in football tournaments",
      "Cleared JEE and NDA examinations, qualified NDA five times"
    ],
    coursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English"
    ]
  },
  {
    degree: "Matriculation",
    institution: "Olympus High School",
    location: "Dehradun, Uttarakhand, India",
    duration: "Mar 2018 - July 2019",
    grade: "98.4%",
    achievements: [
      "Excelled academically across Science, Mathematics, Social Studies, English, and Hindi",
      "Consistently maintained top academic performance"
    ],
    coursework: [
      "Science",
      "Mathematics",
      "Social Studies",
      "English",
      "Hindi"
    ]
  }
];


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
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  };

  return (
    <section id="education" className="py-20 bg-muted/20">
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
              <span className="text-gradient">Education</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic journey and educational achievements that laid the foundation for my career
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden"
              >
                <div className="card-gradient p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-semibold text-lg mb-2">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {edu.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {edu.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Grade */}
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-primary mr-2" />
                      <span className="font-semibold text-primary">Grade: </span>
                      <span className="ml-2 text-foreground font-medium">{edu.grade}</span>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                        <Award className="w-5 h-5 text-primary mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coursework */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                        <GraduationCap className="w-5 h-5 text-primary mr-2" />
                        Key Coursework
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {edu.coursework.map((course, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 bg-muted/50 rounded-lg text-sm text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                          >
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;