// frontend/src/components/modals/CertificateModal.jsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiDownload, FiFileText } from "react-icons/fi";

const BASE_URL = import.meta.env.BASE_URL || "/";

function resolveAssetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (BASE_URL !== "/" && path.startsWith(BASE_URL)) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${cleanBase}${cleanPath}`;
}

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

  if (!cert) return null;

  const pdfUrl = resolveAssetUrl(cert.src);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
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
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-800 focus:outline-none flex flex-col"
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between gap-4 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FiFileText className="text-lg" />
                </div>
                <h2
                  id="certificate-title"
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate"
                >
                  {cert.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition border border-indigo-200/60 dark:border-indigo-500/20"
                  aria-label="Open PDF in new tab"
                >
                  <FiExternalLink /> <span className="hidden sm:inline">Open PDF</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close certificate modal"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CONTENT FRAME */}
            <div className="p-3 sm:p-4 flex-1 h-[65vh] bg-slate-100 dark:bg-gray-950 flex flex-col">
              <iframe
                src={pdfUrl}
                title={cert.title}
                className="w-full h-full rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white"
              />
            </div>

            {/* FOOTER ACTION FALLBACK */}
            <div className="px-5 py-3 border-t border-slate-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-slate-50 dark:bg-gray-900/80 text-slate-600 dark:text-gray-400">
              <span className="font-medium">Verified PDF Document</span>
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <FiExternalLink /> View Fullscreen
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <FiDownload /> Download Certificate
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
