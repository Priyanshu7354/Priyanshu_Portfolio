// frontend/src/components/sections/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Hero({ profilePic, dark }) {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center pt-12">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Availability Badges */}
        <div className="flex flex-wrap gap-3">
          
          {/* Experience Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-emerald-100 dark:bg-emerald-900/30
              text-emerald-700 dark:text-emerald-400
              text-sm font-medium shadow-sm"
          >
            <span className="text-base">⚡</span>
            1.5+ Years Experience
          </motion.div>

          {/* Job Seeking Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-indigo-100 dark:bg-indigo-900/30
              text-indigo-700 dark:text-indigo-400
              text-sm font-medium shadow-sm"
          >
            <span className="text-base">💼</span>
            Open to Java Backend Developer Roles
          </motion.div>
        </div>

        <p className="text-indigo-500 font-medium tracking-wide">
          Hello, I'm Priyanshu 👋
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Java Backend Developer <br className="hidden sm:block" />
          <span className="text-indigo-600">
            building scalable backend systems
          </span>
          .
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
          Java Backend Developer with 1.5+ years of experience building
          scalable microservices and enterprise applications using
          Spring Boot, REST APIs, MySQL, and secure authentication
          systems. Passionate about performance optimization,
          distributed systems, and clean backend architecture.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow"
          >
            View Projects
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg"
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>

      {/* Right Image Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        whileHover={{ y: -6 }}
        className="
          rounded-2xl bg-gradient-to-br
          from-white to-indigo-50
          dark:from-gray-800 dark:to-gray-800
          p-6 shadow-xl transition-all
          hover:shadow-2xl
          hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
          dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
        "
      >
        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { label: "Role", value: "Java Backend Developer" },
            { label: "Experience", value: "1.5+ Years" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="
                p-3 bg-white dark:bg-gray-900
                rounded-lg shadow transition-all
                hover:shadow-xl
              "
            >
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}