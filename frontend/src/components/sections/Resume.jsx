// frontend/src/components/sections/Resume.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiDownload, FiEye, FiFileText } from "react-icons/fi";

export default function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <section id="resume" className="relative mt-24 py-4" aria-label="Resume">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-violet-900/40 to-purple-900/50 dark:from-indigo-950/70 dark:via-violet-950/60 dark:to-purple-950/70 border border-indigo-500/20 dark:border-indigo-400/20 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Ambient Glow */}
        <div
          className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <FiFileText /> Curriculum Vitae
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to review my experience?
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Download or view my detailed resume to review my full professional experience, technical competencies, Spring Boot project architectures, and education background.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto relative z-10">
          <a
            href={resumeUrl}
            download="Priyanshu_Bhatnagar_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <FiDownload className="text-base" /> Download Resume
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/10 dark:bg-white/[0.08] backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <FiEye className="text-base" /> Preview Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}