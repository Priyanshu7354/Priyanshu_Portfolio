import React, { useState, useEffect, useCallback } from "react";
import profilePic from "./assets/profile5.png";
import { projectsData } from "./data/projects";
import { certificates } from "./data/certificates";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Certifications from "./components/sections/Certifications";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import FadeInWhenVisible from "./components/animations/FadeInWhenVisible";
import ProjectModal from "./components/modals/ProjectModal";
import CertificateModal from "./components/modals/CertificateModal";

export default function App() {
  // Initialize dark mode from html class or localStorage / system preference
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [activeProject, setActiveProject] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sync dark class on documentElement and save to localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // System theme preference listener (applies only if user hasn't set explicit override)
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setDark(e.matches);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Header
          dark={dark}
          toggleDark={toggleDark}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        <FadeInWhenVisible>
          <Hero profilePic={profilePic} dark={dark} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <About />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Projects
            projectsData={projectsData}
            setActiveProject={setActiveProject}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Skills />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Experience />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Education />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Certifications
            certificates={certificates}
            setActiveCertificate={setActiveCertificate}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Resume />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <Contact />
        </FadeInWhenVisible>
        <Footer />
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
      <CertificateModal
        cert={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </div>
  );
}
