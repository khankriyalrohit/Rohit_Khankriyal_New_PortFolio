import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/action/projectsActions";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const dispatch = useDispatch();
  const { data: projects, loading, error } = useSelector((state) => state.projects);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects]);

  const getVisibleProjects = () => {
    if (!projects || projects.length === 0) return [];
    const visibleProjects = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % projects.length;
      visibleProjects.push(projects[index]);
    }
    return visibleProjects;
  };

  const handlePrev = () => {
    if (!projects || projects.length === 0) return;
    setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setSelectedProject(null);
  };

  const handleNext = () => {
    if (!projects || projects.length === 0) return;
    setStartIndex((prev) => (prev + 1) % projects.length);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

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

          {/* Loading / Error Handling */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg text-muted-foreground">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg text-red-500">Error loading projects: {error}</p>
            </div>
          )}

          {!loading && !error && projects && projects.length === 0 && (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg text-muted-foreground">No projects found.</p>
            </div>
          )}

          {/* Project Details */}
          {!loading && !error && visibleProjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-12 min-h-[200px] card-gradient p-8 rounded-xl border border-border"
            >
              {selectedProject !== null ? (
                <div className="fade-in">
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    {visibleProjects[selectedProject].title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {visibleProjects[selectedProject].fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {visibleProjects[selectedProject].technologies.map((tech, index) => (
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
                      <a
                        href={visibleProjects[selectedProject].liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={visibleProjects[selectedProject].codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p className="text-lg">Click on a project to see details</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Projects Grid */}
          {!loading && !error && visibleProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className={`group cursor-pointer ${
                    selectedProject === index ? "scale-105 border-primary" : ""
                  }`}
                  onClick={() =>
                    setSelectedProject(selectedProject === index ? null : index)
                  }
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
          )}

          {/* Navigation Arrows */}
          {!loading && !error && visibleProjects.length > 0 && (
            <motion.div variants={itemVariants} className="flex justify-center mt-8 space-x-4">
              <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={handleNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
