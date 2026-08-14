// frontend/src/components/animations/FadeInWhenVisible.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeInWhenVisible({ children, delay = 0 }) {
  const ref = useRef(null);
  // Trigger animation as soon as 5% of section enters viewport (or -40px margin)
  // to avoid blank empty spaces when scrolling on mobile devices
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}