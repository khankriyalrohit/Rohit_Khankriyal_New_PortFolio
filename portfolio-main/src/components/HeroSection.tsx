// src/components/HeroSection.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "@/action/heroActions";
import profileImage from "@/assets/rohit-profile.png";

const HeroSection = () => {
  const dispatch = useDispatch();
  const heroState = useSelector((state) => state.hero);
  const { loading, data, error } = heroState;

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  const texts = data?.texts || [];
  const summary = data?.summary || "";

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(() => {
      const current = texts[currentIndex] || "";

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));

        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Loading Hero Section...</p>;
  if (error) return <p>Error loading Hero Section</p>;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/5 rounded-full blur-2xl float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">Hi, I'm</h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gradient">Rohit Khankriyal</span>
              </h1>
              <div className="h-16 mb-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
                  {currentText}
                  <span className="typing-cursor text-primary"></span>
                </h3>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {summary}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Hire Me
              </Button>
              <a href="https://wa.me/919548716021" target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Let's Chat
                </Button>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start space-x-6">
              <a href="https://www.instagram.com/khankriyal__rohit/" className="p-3 border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com/khankriyalrohit" className="p-3 border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rohit-khankriyal-359680242/" className="p-3 border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl scale-110 animate-pulse"></div>
              <img src={profileImage} alt="Rohit Khankriyal" className="relative w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-full shadow-2xl" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={scrollToAbout}>
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
