// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import AdminLoginModal from "@/components/Admin/AdminLoginModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  // ✅ handle scroll background effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ✅ smooth scrolling
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  // ✅ Admin Login Submit
  const handleAdminSubmit = async (passcode: string) => {
    try {
      const { data } = await axiosInstance.post("/admin/login", { passcode });

      // 🔹 Save JWT token in localStorage
      localStorage.setItem("adminToken", data.token);

      // 🔹 Attach token to axios default header
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setShowModal(false);
      setError("");
      navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid passcode! Try again.");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gradient">
                Rohit Khankriyal
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}

              {/* Admin Button */}
              <Button onClick={() => setShowModal(true)} variant="outline">
                Admin
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <Button onClick={() => setShowModal(true)} size="sm" variant="outline">
                Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg border-b border-border">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 🔹 Admin Login Modal */}
      <AdminLoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdminSubmit}
        error={error}
      />
    </>
  );
};

export default Navbar;
