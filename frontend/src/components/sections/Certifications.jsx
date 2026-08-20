// frontend/src/components/sections/Certifications.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiEye, FiFileText } from "react-icons/fi";

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
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20">
            Certifications
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Verified{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-slate-600 dark:text-gray-400 max-w-2xl font-normal"
        >
          Explore verified professional certifications in Generative AI, React, Node.js, Git, and SQL databases.
        </motion.p>
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
            className="group rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] p-5 shadow-sm shadow-slate-200/60 dark:shadow-none hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:border-indigo-400/60 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FiAward className="text-xl" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-gray-400 border border-slate-200/80 dark:border-white/[0.08]">
                  <FiFileText className="text-xs" /> PDF Verified
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cert.title}
              </h3>
            </div>

            <button
              onClick={() => setActiveCertificate(cert)}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-white/[0.06] border border-indigo-200/80 dark:border-white/[0.1] text-indigo-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm"
              aria-label={`View ${cert.title} certificate`}
            >
              <FiEye className="text-sm" /> View Certificate
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}