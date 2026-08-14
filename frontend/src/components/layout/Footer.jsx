// frontend/src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 py-8 px-4 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200/50 dark:border-white/[0.06] leading-relaxed">
      © {new Date().getFullYear()} Priyanshu Bhatnagar — Java Backend Developer | 3.2 Years Experience
    </footer>
  );
}