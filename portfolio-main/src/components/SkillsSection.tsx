import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Palette, TrendingUp, Settings, Code, Users } from "lucide-react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

const skills = [
  {
    icon: Monitor,
    title: "Web Development",
    description:
      "We don’t just build websites; we craft experiences. If it can be imagined, it can be coded.",
  },
  {
    icon: Palette,
    title: "Web Designing",
    description:
      "If you are a creator, you know your design cannot depend on trends alone — it must define them.",
  },
  {
    icon: TrendingUp,
    title: "Deep Learning",
    description:
      "If you are an innovator, you know progress cannot depend on the limits of today’s algorithms.",
  },
  {
    icon: Settings,
    title: "Problem Solving",
    description:
      "Great problem solvers know solutions are born from challenges, not comfort.",
  },
  {
    icon: Code,
    title: "Programming Languages",
    description:
      "A C developer knows efficiency cannot depend on endless layers of abstraction.",
  },
  {
    icon: Users,
    title: "Executive Competence",
    description:
      "The ability to lead with clarity, make informed decisions, and drive teams toward strategic goals.",
  },
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20">
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
              <span className="text-gradient">Skills</span>
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Space for Custom Section */}
          <div className="h-20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;