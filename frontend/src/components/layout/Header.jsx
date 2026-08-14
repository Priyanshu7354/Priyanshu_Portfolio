// frontend/src/components/layout/Header.jsx
import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiSun, FiMoon, FiDownload, FiX, FiMenu } from "react-icons/fi";
import useActiveSection from "../../hooks/useActiveSection";
import useScrollDirection from "../../hooks/useScrollDirection";

/* ──────────────────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────────────────── */

/** Navigation items — single source of truth for desktop and mobile */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

/** Section IDs for Intersection Observer (order matches page flow) */
const SECTION_IDS = [
  "hero",
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "certifications",
  "resume",
  "contact",
];

const GITHUB_URL = "https://github.com/Priyanshu7354";
const LINKEDIN_URL = "https://www.linkedin.com/in/priyanshu-bhatnagar45/";
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

/* ──────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────── */

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.15 } },
};

const mobileDrawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.04, duration: 0.3, ease: "easeOut" },
  }),
};

/* ──────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────────────────────────────── */

/** Animated logo with gradient icon */
function Logo() {
  return (
    <a
      href="#hero"
      className="flex items-center gap-3 group"
      aria-label="Priyanshu Bhatnagar — Home"
    >
      {/* Gradient icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 rounded-xl
          bg-gradient-to-br from-indigo-500 to-violet-600
          flex items-center justify-center
          text-white text-sm font-bold
          shadow-lg shadow-indigo-500/20
          transition-shadow duration-300
          group-hover:shadow-indigo-500/40"
      >
        PB
      </motion.div>

      {/* Name + role */}
      <div className="hidden sm:block">
        <div className="text-sm font-bold text-gray-900 dark:text-white
          tracking-tight leading-tight">
          Priyanshu Bhatnagar
        </div>
        <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500
          tracking-wide">
          Java Backend Developer
        </div>
      </div>
    </a>
  );
}

/** Desktop navigation link with active indicator */
function NavLink({ label, href, isActive }) {
  return (
    <a
      href={href}
      className={`relative py-1.5 text-[13px] font-medium
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-gray-900
        rounded-sm
        ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Navigate to ${label} section`}
    >
      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          layoutId="navActiveDot"
          className="absolute -top-0.5 left-1/2 -translate-x-1/2
            w-1 h-1 rounded-full
            bg-indigo-500 dark:bg-indigo-400"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          aria-hidden="true"
        />
      )}

      {label}

      {/* Animated underline */}
      {isActive && (
        <motion.span
          layoutId="navActiveUnderline"
          className="absolute -bottom-0.5 left-0 right-0 h-[2px]
            bg-gradient-to-r from-indigo-500 to-violet-500
            rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

/** Animated dark mode toggle button */
function ThemeToggle({ dark, toggleDark }) {
  return (
    <motion.button
      onClick={toggleDark}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="p-2 rounded-xl
        text-gray-500 dark:text-gray-400
        hover:text-gray-900 dark:hover:text-white
        hover:bg-gray-100 dark:hover:bg-white/[0.06]
        border border-transparent
        hover:border-gray-200 dark:hover:border-white/[0.08]
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-gray-900"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <FiMoon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <FiSun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/** Mobile navigation drawer */
function MobileDrawer({ isOpen, onClose, activeSection, dark, toggleDark }) {
  const drawerRef = useRef(null);

  /* Focus trap + Escape + body scroll lock */
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Focus the drawer
    drawerRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50
              bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.nav
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={mobileDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50
              w-[280px] max-w-[85vw]
              bg-white/95 dark:bg-gray-900/95
              backdrop-blur-xl
              border-l border-gray-200/50 dark:border-white/[0.06]
              shadow-2xl
              md:hidden
              focus:outline-none
              flex flex-col"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4
              border-b border-gray-100 dark:border-white/[0.06]">
              <span className="text-sm font-bold text-gray-900 dark:text-white
                tracking-tight">
                Navigation
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl
                  text-gray-400 hover:text-gray-900
                  dark:hover:text-white
                  hover:bg-gray-100 dark:hover:bg-white/[0.06]
                  transition-colors"
                aria-label="Close navigation menu"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      custom={index}
                      variants={mobileNavItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl
                        text-sm font-medium
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-indigo-500
                        ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white"
                        }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* Active dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                          ${isActive
                            ? "bg-indigo-500 dark:bg-indigo-400"
                            : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        aria-hidden="true"
                      />
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-100 dark:border-white/[0.06]" />

              {/* External links */}
              <div className="space-y-1">
                <motion.a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={NAV_ITEMS.length}
                  variants={mobileNavItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm font-medium
                    text-gray-600 dark:text-gray-400
                    hover:bg-gray-50 dark:hover:bg-white/[0.04]
                    hover:text-gray-900 dark:hover:text-white
                    transition-colors"
                >
                  <FiGithub className="w-4 h-4" aria-hidden="true" />
                  GitHub
                </motion.a>

                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={NAV_ITEMS.length + 1}
                  variants={mobileNavItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm font-medium
                    text-gray-600 dark:text-gray-400
                    hover:bg-gray-50 dark:hover:bg-white/[0.04]
                    hover:text-gray-900 dark:hover:text-white
                    transition-colors"
                >
                  <FiLinkedin className="w-4 h-4 text-blue-500" aria-hidden="true" />
                  LinkedIn
                </motion.a>

                <motion.a
                  href={RESUME_URL}
                  download="Priyanshu_Bhatnagar_Resume.pdf"
                  custom={NAV_ITEMS.length + 2}
                  variants={mobileNavItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm font-medium
                    text-gray-600 dark:text-gray-400
                    hover:bg-gray-50 dark:hover:bg-white/[0.04]
                    hover:text-gray-900 dark:hover:text-white
                    transition-colors"
                >
                  <FiDownload className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </motion.a>
              </div>
            </div>

            {/* Bottom theme toggle */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.06]">
              <button
                onClick={() => { toggleDark(); onClose(); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                  text-sm font-medium
                  text-gray-600 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-white/[0.04]
                  hover:text-gray-900 dark:hover:text-white
                  transition-colors
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-indigo-500"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? (
                  <FiMoon className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <FiSun className="w-4 h-4" aria-hidden="true" />
                )}
                {dark ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   HEADER — main export
   ────────────────────────────────────────────────────────────────────── */

export default function Header({
  dark,
  toggleDark,
  showMobileMenu,
  setShowMobileMenu,
}) {
  const activeSection = useActiveSection(SECTION_IDS);
  const { scrollDirection, isScrolled } = useScrollDirection(10);

  // Memoize nav items to avoid re-rendering on every scroll
  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const sectionId = item.href.replace("#", "");
        return (
          <NavLink
            key={item.label}
            label={item.label}
            href={item.href}
            isActive={activeSection === sectionId}
          />
        );
      }),
    [activeSection]
  );

  const closeMobileMenu = useCallback(
    () => setShowMobileMenu(false),
    [setShowMobileMenu]
  );

  // Header visibility: hide on scroll down (unless mobile menu is open)
  const isHidden = scrollDirection === "down" && isScrolled && !showMobileMenu;

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isHidden ? -100 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`fixed top-0 left-0 right-0 z-40
          transition-all duration-300
          ${
            isScrolled
              ? "py-2.5 shadow-sm shadow-gray-900/5 dark:shadow-black/20"
              : "py-4 shadow-none"
          }
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl
          border-b
          ${
            isScrolled
              ? "border-gray-200/50 dark:border-white/[0.06]"
              : "border-transparent"
          }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <Logo />

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden lg:flex items-center gap-5"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* GitHub icon button */}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-xl
                text-gray-500 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100 dark:hover:bg-white/[0.06]
                border border-transparent
                hover:border-gray-200 dark:hover:border-white/[0.08]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-500"
              aria-label="View GitHub profile"
            >
              <FiGithub className="w-4 h-4" />
            </motion.a>

            {/* LinkedIn icon button */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-xl
                text-gray-500 dark:text-gray-400
                hover:text-blue-600 dark:hover:text-blue-400
                hover:bg-gray-100 dark:hover:bg-white/[0.06]
                border border-transparent
                hover:border-gray-200 dark:hover:border-white/[0.08]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-500"
              aria-label="View LinkedIn profile"
            >
              <FiLinkedin className="w-4 h-4" />
            </motion.a>

            {/* Theme toggle */}
            <ThemeToggle dark={dark} toggleDark={toggleDark} />

            {/* Resume button */}
            <motion.a
              href={RESUME_URL}
              download="Priyanshu_Bhatnagar_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2
                px-4 py-2 rounded-xl
                text-xs font-semibold
                bg-gradient-to-r from-indigo-600 to-violet-600
                hover:from-indigo-500 hover:to-violet-500
                text-white
                shadow-md shadow-indigo-500/20
                hover:shadow-lg hover:shadow-indigo-500/30
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-gray-900"
              aria-label="Download Resume (PDF)"
            >
              <FiDownload className="w-3.5 h-3.5" aria-hidden="true" />
              Resume
            </motion.a>
          </div>

          {/* ── Mobile: Theme toggle + Hamburger ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle dark={dark} toggleDark={toggleDark} />

            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-xl
                text-gray-600 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-white/[0.06]
                border border-gray-200 dark:border-white/[0.08]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-500"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={showMobileMenu}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showMobileMenu ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        isOpen={showMobileMenu}
        onClose={closeMobileMenu}
        activeSection={activeSection}
        dark={dark}
        toggleDark={toggleDark}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className={`${isScrolled ? "h-14" : "h-16"} transition-all duration-300`} />
    </>
  );
}
