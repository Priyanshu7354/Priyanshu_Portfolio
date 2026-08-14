// frontend/src/components/sections/Education.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { FiCalendar, FiMapPin, FiBookOpen } from "react-icons/fi";

export default function Education() {
  return (
    <section id="education" className="relative mt-24 py-4" aria-label="Education">
      {/* Section Header */}
      <div className="mb-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20">
            Education
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Academic{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Background
          </span>
        </motion.h2>
      </div>

      {/* Education Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Graduation Cap Icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <FaGraduationCap className="text-2xl" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Bachelor of Technology — Computer Science & Engineering
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit">
                <FiCalendar /> 2022 – 2026
              </span>
            </div>

            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              <FiMapPin className="text-indigo-400" /> Sagar Institute of Science, Technology & Research (SISTec-R), Bhopal, MP
            </p>

            <div className="pt-3 border-t border-gray-200/50 dark:border-white/[0.06]">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-2">
                <FiBookOpen /> Core Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Core Java & OOP",
                  "Data Structures & Algorithms",
                  "Database Management Systems (DBMS)",
                  "Operating Systems",
                  "Computer Networks",
                  "Software Engineering",
                ].map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-white/[0.08]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}