import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">Rohit Khankriyal</h3>
            <p className="text-muted-foreground">
              © 2024 Rohit Khankriyal. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/khankriyal__rohit/" className="p-2 hover:text-primary transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://github.com/khankriyalrohit" className="p-2 hover:text-primary transition-colors duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/rohit-khankriyal-359680242/" className="p-2 hover:text-primary transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:khankriyalrohit434@gmail.com" className="p-2 hover:text-primary transition-colors duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;