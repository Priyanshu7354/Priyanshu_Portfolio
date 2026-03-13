// frontend/src/components/animations/TiltCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}