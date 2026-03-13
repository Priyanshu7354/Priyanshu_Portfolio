// frontend/src/components/sections/Education.jsx
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

export default function Education() {
  return (
    <section id="education" className="mt-20">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8 tracking-tight">
        Education
      </h2>

      {/* Education Card */}
      <div
        className="
        bg-white dark:bg-gray-800 
        border dark:border-gray-700
        p-6 
        rounded-xl 
        shadow
        flex gap-5
        transition-all duration-300

        hover:shadow-xl
        hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
        dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
        hover:-translate-y-1
      "
      >
        {/* Icon */}
        <div className="flex items-start justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
            <FaGraduationCap className="text-indigo-600 text-xl" />
          </div>
        </div>

        {/* Education Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h3 className="font-semibold text-lg">
              Bachelor of Technology — Computer Science & Engineering
            </h3>

            <span className="text-sm text-gray-500">
              2022 – 2026
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Sagar Institute of Science, Technology & Research (SISTec-R), Bhopal, Madhya Pradesh
          </p>

          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
            Relevant Coursework: Core Java, Object-Oriented Programming,
            Data Structures & Algorithms, Database Management Systems,
            Operating Systems, Computer Networks.
          </p>
        </div>
      </div>
    </section>
  );
}