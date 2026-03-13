// frontend/src/components/layout/Header.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({
  dark,
  toggleDark,
  showMobileMenu,
  setShowMobileMenu,
}) {
  return (
    <header className="flex items-center justify-between py-4 sticky top-0 z-40 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">

      {/* ================= LOGO ================= */}
      <div className="flex items-center gap-3">
        <a href="/" aria-label="Home">
          <div
            className="
              w-10 h-10 rounded-lg
              bg-gradient-to-br from-indigo-500 to-sky-400
              text-white flex items-center justify-center
              font-bold transition-all duration-300
              hover:scale-110
            "
          >
            P
          </div>
        </a>

        <div>
          <div className="text-lg font-semibold">
            Priyanshu Bhatnagar
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Java Backend Developer
          </div>
        </div>
      </div>

      {/* ================= MOBILE HAMBURGER ================= */}
      <button
        aria-label="Toggle mobile menu"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="
          md:hidden p-2 rounded-md
          border border-gray-300 dark:border-gray-700
          transition-all duration-300
          hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800
        "
      >
        <div className={`hamburger ${showMobileMenu ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex items-center gap-6 text-sm">

        {[
          ["Projects", "#projects"],
          ["Certifications", "#certifications"],
          ["Skills", "#skills"],
          ["Education", "#education"],
          ["Experience", "#experience"],
          ["Resume", "#resume"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="
              relative transition-all duration-300
              hover:text-indigo-400
              after:absolute after:bottom-[-4px] after:left-0
              after:w-0 after:h-0.5 after:bg-indigo-400
              after:transition-all after:duration-300
              hover:after:w-full
            "
          >
            {label}
          </a>
        ))}

        {/* GitHub */}
        <a
          href="https://github.com/Priyanshu7354"
          target="_blank"
          rel="noopener noreferrer"
          className="relative transition-all duration-300 hover:text-indigo-400 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/priyanshu-bhatnagar45/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative transition-all duration-300 hover:text-indigo-400 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          LinkedIn
        </a>

        {/* ================= DARK MODE TOGGLE ================= */}
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          className="
            ml-3 p-2 rounded-md
            border border-gray-300 dark:border-gray-700
            transition-all duration-300
            hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                🌙
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                ☀️
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>
    </header>
  );
}
