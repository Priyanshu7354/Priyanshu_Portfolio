// frontend/src/components/sections/Resume.jsx
import React from "react";

export default function Resume() {
  return (
    <section id="resume" className="mt-20">
      <div className="
        bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col transition-all
        hover:shadow-xl
        hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
        dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
        hover:-translate-y-1
      ">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400">
          Resume
        </h2>
       <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
          Download or view my latest resume to learn more about my
          experience, skills, and projects.
        </p>
        <div className="flex gap-4">
          <a
            href="/Priyanshu.pdf"
            download
            className="
              px-6 py-3 bg-indigo-600 text-white rounded-lg shadow
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
            "
          >
            📄 Download Resume
          </a>
          <a
            href="/Priyanshu.pdf"
            target="_blank"
            className="
              px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
            "
          >
            👀 View Resume
          </a>
        </div>
      </div>
    </section>
  );
}