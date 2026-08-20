// frontend/src/components/modals/CertificateModal.jsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiDownload, FiFileText } from "react-icons/fi";
import { getAssetUrl } from "../../data/certificates";

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

  // Fully qualified absolute URL for PDF
  const pdfUrl = getAssetUrl(cert.src || `certificates/${cert.fileName}`);

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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition border border-indigo-200/60 dark:border-indigo-500/20 shadow-sm"
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

            {/* CONTENT FRAME WITH EMBED/IFRAME FALLBACK */}
            <div className="p-3 sm:p-4 flex-1 h-[65vh] bg-slate-100 dark:bg-gray-950 flex flex-col">
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-full rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white"
              >
                <iframe
                  src={pdfUrl}
                  title={cert.title}
                  className="w-full h-full rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white"
                >
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                    <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                      Your browser does not support inline PDF previewing.
                    </p>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
                    >
                      Click here to view PDF directly
                    </a>
                  </div>
                </iframe>
              </object>
            </div>

            {/* FOOTER ACTION FALLBACK */}
            <div className="px-5 py-3 border-t border-slate-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-slate-50 dark:bg-gray-900/80 text-slate-600 dark:text-gray-400">
              <span className="font-medium">Verified PDF Document</span>
              <div className="flex items-center gap-4">
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
                  download={cert.fileName || "certificate.pdf"}
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

