// frontend/src/components/animations/FadeInWhenVisible.jsx
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeInWhenVisible({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
}