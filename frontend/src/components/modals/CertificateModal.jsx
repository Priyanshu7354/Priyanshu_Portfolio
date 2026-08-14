// frontend/src/components/modals/CertificateModal.jsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiDownload } from "react-icons/fi";

export default function CertificateModal({ cert, onClose }) {
  const modalRef = useRef(null);
  const startY = useRef(0);

  /* ================= ESC KEY + FOCUS ================= */
  useEffect(() => {
    if (!cert) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    // lock background scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

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
      {cert && (
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
            aria-labelledby="certificate-title"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 focus:outline-none flex flex-col"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
              <h2
                id="certificate-title"
                className="text-lg font-bold text-gray-900 dark:text-white truncate"
              >
                {cert.title}
              </h2>

              <div className="flex items-center gap-2">
                <a
                  href={cert.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition"
                  aria-label="Open PDF in new tab"
                >
                  <FiExternalLink /> <span className="hidden sm:inline">Open PDF</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close certificate modal"
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CONTENT FRAME */}
            <div className="p-4 flex-1 h-[65vh] bg-gray-50 dark:bg-gray-950 flex flex-col">
              <iframe
                src={cert.src}
                title={cert.title}
                className="w-full h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white"
              />
            </div>

            {/* FOOTER ACTION FALLBACK */}
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Having trouble viewing the PDF frame?</span>
              <a
                href={cert.src}
                download
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <FiDownload /> Download Certificate
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}