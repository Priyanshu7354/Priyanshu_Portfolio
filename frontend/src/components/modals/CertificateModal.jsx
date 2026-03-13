// frontend/src/components/modals/CertificateModal.jsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      document.body.style.overflow = "auto";
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
          className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center p-4
          "
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
            className="
              relative w-full max-w-5xl max-h-[90vh] overflow-hidden
              bg-white dark:bg-gray-900
              rounded-2xl shadow-2xl
              border border-gray-200 dark:border-gray-700
              focus:outline-none
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close certificate"
              className="
                absolute top-4 right-4 z-10
                p-2 rounded-full
                text-gray-500 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition
              "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* HEADER */}
            <div className="px-6 pt-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              <h2
                id="certificate-title"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {cert.title}
              </h2>
            </div>

            {/* CONTENT */}
            <div className="p-6 h-[70vh]">
              <iframe
                src={cert.src}
                title={cert.title}
                className="
                  w-full h-full rounded-lg
                  border border-gray-300 dark:border-gray-700
                  bg-white
                "
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 pb-6 text-center">
              <p className="text-xs text-gray-400 md:hidden">
                Swipe down to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}