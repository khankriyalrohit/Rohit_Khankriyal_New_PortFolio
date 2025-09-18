import React from "react";
import HeroAdminForm from "@/components/Admin/HeroAdminForm";
import SkillsAdminSection from "@/components/Admin/SkillsAdminSection";
import ExperienceAdminSection from "@/components/Admin/ExperienceAdminSection";
import ProjectsAdminSection from "@/components/Admin/ProjectsAdminSection";
import { Button } from "@/components/ui/button";
import { setAdminToken } from "@/utils/axiosInstance";

const Admin = () => {

  const handleExit = () => {
    setAdminToken(null);              // clears axiosInstance header + sessionStorage
    window.location.href = "/";       // or use navigate("/")
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 overflow-y-auto">
      <h1 className="text-4xl font-bold text-center mb-10">
        Portfolio Admin Dashboard
      </h1>

      <div className="space-y-16 max-w-7xl mx-auto">
        <HeroAdminForm />
        <SkillsAdminSection />
        <ExperienceAdminSection />
        <ProjectsAdminSection />
      </div>

      <div className="flex justify-center mt-16">
        <Button
          variant="destructive"
          className="px-6 py-3 text-lg rounded-xl shadow-md"
          onClick={handleExit}
        >
          Exit Admin Mode
        </Button>
      </div>
    </div>
  );
};

export default Admin;
