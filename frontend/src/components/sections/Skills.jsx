// frontend/src/components/sections/Skills.jsx
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const skills = [
  "Java",
  "Spring Boot",
  "Spring MVC",
  "REST APIs",
  "Microservices",
  "Hibernate / JPA",
  "MySQL",
  "MongoDB",
  "JWT Authentication",
  "Maven",
  "Swagger",
  "Postman",
  "Git / GitHub",
  "React",
];

export default function Skills() {
  return (
    <section id="skills" className="mt-20">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 tracking-tight"
      >
        Technical Skills
      </motion.h2>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill}
            variants={card}
            whileHover={{ y: -6 }}
            role="button"
            tabIndex={0}
            className="
              p-4
              bg-white dark:bg-gray-800
              border dark:border-gray-700
              rounded-xl
              shadow
              flex items-center gap-4
              transition-all duration-300

              hover:shadow-xl
              hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
              dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
              hover:-translate-y-1

              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
            "
          >
            {/* Skill Icon */}
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center rounded-md font-bold text-indigo-600 dark:text-indigo-400">
              {skill[0]}
            </div>

            {/* Skill Info */}
            <div>
              <div className="font-semibold">{skill}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Experienced
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}