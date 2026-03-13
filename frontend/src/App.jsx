import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "./assets/profile5.png";
import { projectsData } from "./data/projects";
import { certificates } from "./data/certificates";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Certifications from "./components/sections/Certifications";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";  // Now static
import Footer from "./components/layout/Footer";
import FadeInWhenVisible from "./components/animations/FadeInWhenVisible";
import ProjectModal from "./components/modals/ProjectModal";
import CertificateModal from "./components/modals/CertificateModal";

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // REMOVED: emailForm state, handleChange, handleSubmit (no form needed)

  // Auto theme detection (syncs with system)
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(media.matches);
    const handleChange = () => setDark(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleDark = () => setDark((v) => !v);

  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Header
            dark={dark}
            toggleDark={toggleDark}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />
          <AnimatePresence>
            {showMobileMenu && (
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 md:hidden"
              >
                {/* TOP BAR */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
                  <span className="font-semibold text-lg">Menu</span>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="text-2xl font-bold"
                    aria-label="Close Menu"
                  >
                    ✕
                  </button>
                </div>
                {/* MENU LINKS */}
                <div className="flex flex-col px-6 py-6 space-y-5 text-base">
                  <a href="#projects" onClick={closeMobileMenu}>Projects</a>
                  <a href="#certifications" onClick={closeMobileMenu}>Certifications</a>
                  <a href="#skills" onClick={closeMobileMenu}>Skills</a>
                  <a href="#experience" onClick={closeMobileMenu}>Experience</a>
                  <a href="#education" onClick={closeMobileMenu}>Education</a>
                  <a href="#resume" onClick={closeMobileMenu}>Resume</a>
                  <a href="#contact" onClick={closeMobileMenu}>Contact</a>
                  <hr className="border-gray-300 dark:border-gray-700" />
                  <a
                    href="https://github.com/Priyanshu7354"
                    target="_blank"
                    onClick={closeMobileMenu}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/priyanshu-bhatnagar45/"
                    target="_blank"
                    onClick={closeMobileMenu}
                  >
                    LinkedIn
                  </a>
                  <button
                    onClick={() => { toggleDark(); closeMobileMenu(); }}
                    className="mt-4 px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  >
                    {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
                  </button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
          <FadeInWhenVisible>
            <Hero profilePic={profilePic} dark={dark} />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Certifications
              certificates={certificates}
              setActiveCertificate={setActiveCertificate}
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Skills />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Projects
              projectsData={projectsData}
              setActiveProject={setActiveProject}
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Education />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Experience />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Resume />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Contact />  {/* Now no props needed */}
          </FadeInWhenVisible>
          <Footer />
        </div>
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
