// frontend/src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 py-8 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Priyanshu Bhatnagar — Built with React + Tailwind
    </footer>
  );
}