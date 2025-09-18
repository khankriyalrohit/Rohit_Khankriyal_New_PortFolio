import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Monitor, Palette, TrendingUp, Brain, Cpu, Code } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "@/action/skillsActions";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.skills);

  // Extract skills array from backend response
  const skills = data?.skills || [];

  // Fixed icons for cycling
const icons = [Monitor, Palette, TrendingUp, Brain, Cpu, Code];

  useEffect(() => {
    if (!data) dispatch(fetchSkills());
  }, [dispatch, data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
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

          {/* Loading / Error */}
          {loading && (
            <p className="text-center text-muted-foreground">Loading skills...</p>
          )}
          {error && <p className="text-center text-red-500">Error loading skills</p>}

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {skills.map((skill, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={skill._id}
                  variants={itemVariants}
                  className="group p-8 rounded-xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
