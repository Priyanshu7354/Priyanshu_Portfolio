import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const startY = useRef(0);

  /* ================= ESC KEY + FOCUS TRAP ================= */
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  /* ================= SWIPE DOWN (MOBILE) ================= */
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY.current > 120) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="
              relative w-full max-w-lg max-h-[90vh] overflow-y-auto
              bg-white dark:bg-gray-900
              rounded-2xl shadow-2xl
              border border-gray-200 dark:border-gray-700
              focus:outline-none
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute top-4 right-4 z-10
                p-2 rounded-full
                text-gray-500 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition
              "
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="p-6 pt-12 space-y-6">
              <h2
                id="project-title"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {project.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* SCREENSHOTS */}
              {project.screenshots?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-indigo-500">
                    Screenshots
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {project.screenshots.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="
                          h-36 rounded-lg
                          object-cover
                          border border-gray-300 dark:border-gray-700
                          hover:scale-105 transition
                        "
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TECH STACK */}
              <div>
                <h3 className="font-semibold text-indigo-500 mb-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="
                        text-xs px-3 py-1 rounded-full
                        bg-indigo-100 dark:bg-indigo-900/40
                        text-indigo-700 dark:text-indigo-300
                        border border-indigo-300 dark:border-indigo-700
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* GITHUB ONLY (LIVE DEMO REMOVED) */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block text-center
                  px-6 py-3 rounded-lg
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 hover:scale-[1.02]
                  transition
                "
              >
                View on GitHub
              </a>

              {/* MOBILE HINT */}
              <p className="text-xs text-center text-gray-400 mt-2 md:hidden">
                Swipe down to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
