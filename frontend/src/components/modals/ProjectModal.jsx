// frontend/src/components/modals/ProjectModal.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiBookOpen,
  FiList,
  FiCpu,
  FiAlertTriangle,
  FiAward,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiLayers,
  FiGrid,
  FiCheckCircle,
} from "react-icons/fi";
import { TechChip, CATEGORY_COLORS } from "../sections/Projects";

/* ──────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const contentStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const DETAIL_SECTIONS = [
  {
    key: "features",
    label: "Key Architectural Features",
    icon: FiList,
    accent: "from-emerald-500 to-teal-500",
    accentText: "text-emerald-700 dark:text-emerald-400",
  },
  {
    key: "challenges",
    label: "Engineering Challenges & Solutions",
    icon: FiAlertTriangle,
    accent: "from-amber-500 to-orange-500",
    accentText: "text-amber-700 dark:text-amber-400",
  },
  {
    key: "learnings",
    label: "Key Technical Insights",
    icon: FiAward,
    accent: "from-blue-500 to-indigo-500",
    accentText: "text-blue-700 dark:text-blue-400",
  },
  {
    key: "improvements",
    label: "Future Architectural Roadmap",
    icon: FiTrendingUp,
    accent: "from-violet-500 to-purple-500",
    accentText: "text-violet-700 dark:text-violet-400",
  },
];

/* ──────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────────────────────────────── */

function DetailSection({ section, items }) {
  if (!items || items.length === 0) return null;
  const Icon = section.icon;

  return (
    <motion.div variants={contentItem} className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${section.accent}`}>
          <Icon className="text-sm text-white" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold uppercase tracking-wider ${section.accentText}`}>
          {section.label}
        </h4>
      </div>
      <ul className="space-y-2 ml-1" role="list">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 group/item">
            <span
              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${section.accent}`}
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed text-slate-700 dark:text-gray-400 group-hover/item:text-slate-900 dark:group-hover/item:text-gray-200 transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ModulesSection({ modules }) {
  if (!modules || modules.length === 0) return null;

  return (
    <motion.div variants={contentItem} className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
          <FiGrid className="text-sm text-white" aria-hidden="true" />
        </div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          Decoupled Microservice Modules
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 dark:text-emerald-500 text-sm shrink-0" />
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {mod.name}
              </h5>
            </div>
            <p className="text-xs text-slate-700 dark:text-gray-400 leading-relaxed pl-5">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ScreenshotGallery({ screenshots, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [screenshots]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }, [screenshots]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, [screenshots]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <motion.div variants={contentItem} className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
            <FiImage className="text-sm text-white" aria-hidden="true" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            Screenshots
          </h4>
          {screenshots.length > 1 && (
            <span className="text-xs font-medium text-slate-500 dark:text-gray-500 tabular-nums">
              {activeIndex + 1} / {screenshots.length}
            </span>
          )}
        </div>

        {screenshots.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={goPrev}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
              aria-label="Previous screenshot"
            >
              <FiChevronLeft className="text-base" />
            </button>
            <button
              onClick={goNext}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
              aria-label="Next screenshot"
            >
              <FiChevronRight className="text-base" />
            </button>
          </div>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
        <img
          src={screenshots[activeIndex]}
          alt={`${title} screenshot ${activeIndex + 1}`}
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   PROJECT MODAL — main export
   ────────────────────────────────────────────────────────────────────── */

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [project, onClose]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY > 120) onClose();
    },
    [onClose]
  );

  const liveDemoUrl = project?.live || project?.liveDemo || null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
          aria-hidden="false"
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-2xl shadow-slate-900/20 dark:shadow-2xl focus:outline-none"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-3 float-right mr-3 sm:mr-4 z-20 p-2 sm:p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/80 border border-slate-200 dark:border-white/[0.1] backdrop-blur-sm text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.1] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close project details"
            >
              <FiX className="text-lg" />
            </button>

            {/* Content */}
            <motion.div
              variants={contentStagger}
              initial="hidden"
              animate="visible"
              className="p-4 sm:p-8 space-y-5 sm:space-y-7"
            >
              {/* Header */}
              <motion.div variants={contentItem} className="space-y-3 pr-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${CATEGORY_COLORS[project.category] || ""}`}>
                    {project.category}
                  </span>
                  {project.architecturePattern && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30">
                      <FiLayers /> {project.architecturePattern}
                    </span>
                  )}
                </div>

                <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {project.title}
                </h2>
              </motion.div>

              {/* Overview */}
              <motion.div variants={contentItem} className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
                    <FiBookOpen className="text-sm text-white" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    System Overview & Business Context
                  </h4>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-gray-400">
                  {project.description}
                </p>
              </motion.div>

              {/* Screenshots */}
              <ScreenshotGallery screenshots={project.screenshots} title={project.title} />

              {/* Tech Stack */}
              <motion.div variants={contentItem} className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <FiCpu className="text-sm text-white" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                    Technology Stack & Libraries
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {(project.techStack || project.tech || []).map((t) => (
                    <TechChip key={t} name={t} size="md" />
                  ))}
                </div>
              </motion.div>

              {/* Modules breakdown (if available) */}
              <ModulesSection modules={project.modules} />

              {/* Detail sections: Features, Challenges, Learnings, Improvements */}
              {DETAIL_SECTIONS.map((section) => (
                <DetailSection key={section.key} section={section} items={project[section.key]} />
              ))}

              {/* Action buttons */}
              <motion.div variants={contentItem} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10 dark:shadow-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 w-full sm:w-auto"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FiGithub className="text-base transition-transform group-hover:scale-110" aria-hidden="true" />
                    View on GitHub
                  </a>
                )}

                {project.githubNote && !project.github && (
                  <span className="text-xs font-semibold text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-white/[0.06] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] text-center w-full sm:w-auto">
                    ℹ️ {project.githubNote}
                  </span>
                )}

                {liveDemoUrl && (
                  <a
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 w-full sm:w-auto"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <FiExternalLink className="text-base transition-transform group-hover:scale-110" aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </motion.div>

              {/* Mobile hint */}
              <p className="text-xs text-center text-slate-400 dark:text-gray-500 mt-1 md:hidden">
                Swipe down to close
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
