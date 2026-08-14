// frontend/src/components/sections/Certifications.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiEye } from "react-icons/fi";

export default function Certifications({ certificates, setActiveCertificate }) {
  return (
    <section id="certifications" className="relative mt-12 sm:mt-20 lg:mt-24 py-2 sm:py-4" aria-label="Certifications">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20">
            Certifications
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Verified{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </motion.h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl p-5 shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FiAward className="text-xl" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cert.title}
              </h3>
            </div>

            <button
              onClick={() => setActiveCertificate(cert)}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/80 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.1] text-gray-800 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm"
            >
              <FiEye className="text-sm" /> View Certificate
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}