import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Users, Code, Coffee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "@/action/heroActions";


const AboutSection = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  // Get hero data from Redux
const { data, loading, error } = useSelector((state) => state.hero);

  const [counters, setCounters] = useState({
    projects: 0,
    certifications: 0,
    clients: 0,
    coffees: 0,
  });

  const finalCounts = {
    projects: 15,
    certifications: 8,
    clients: 10,
    coffees: 999,
  };

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(finalCounts).forEach((key) => {
        let current = 0;
        const increment = finalCounts[key] / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalCounts[key]) {
            current = finalCounts[key];
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, stepDuration);
      });
    }
  }, [isInView]);

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

  const achievements = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Graduated with distinction in Computer Science"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in modern web technologies and frameworks"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led multiple successful project teams and initiatives"
    }
  ];

  const stats = [
    {
      icon: Code,
      count: counters.projects,
      label: "Projects Completed",
      color: "text-primary"
    },
    {
      icon: Award,
      count: counters.certifications,
      label: "Certifications",
      color: "text-green-400"
    },
    {
      icon: Users,
      count: counters.clients,
      label: "Happy Clients",
      color: "text-purple-400"
    },
    {
      icon: Coffee,
      count: counters.coffees,
      label: "Cups of Coffee",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* About Paragraph */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {data?.about || "Loading about information..."}
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <div key={index} className="card-gradient p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats Counter */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.count}+
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
