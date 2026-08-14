// frontend/src/components/sections/Experience.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from "react-icons/fi";

const EXPERIENCES = [
  {
    role: "Software Engineer – Java Developer",
    company: "iSteer Technologies",
    location: "Bengaluru, Karnataka",
    period: "May 2023 – Present (3.2 Years)",
    type: "Full-Time",
    accent: "from-indigo-500 to-violet-500",
    bullets: [
      "Engineered and maintained scalable RESTful microservices using Java (Java 8 / Java 17), Spring Boot, Spring MVC, and Spring Data JPA (Hibernate).",
      "Implemented stateless authentication and Role-Based Access Control (RBAC) using Spring Security and JWT token lifecycles.",
      "Architected event-driven asynchronous messaging pipelines using Apache Kafka for booking updates, notifications, and event streaming.",
      "Integrated Redis distributed caching for slot availability and frequently accessed entity lookup to minimize MySQL database queries.",
      "Configured Spring Cloud API Gateway routing, authentication filters, and Eureka Server for dynamic microservices discovery.",
      "Integrated third-party APIs including Stripe payment gateway and Twilio SMS/email notification services.",
      "Wrote structured unit and integration test suites using JUnit 5 and Mockito in Agile/Scrum sprint workflows.",
    ],
    tech: [
      "Java 8 / 17",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "Redis",
      "Apache Kafka",
      "Microservices",
      "REST APIs",
      "AWS",
      "JUnit",
      "Mockito",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative mt-24 py-4" aria-label="Work Experience">
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
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Professional{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Experience
          </span>
        </motion.h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${exp.accent}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FiBriefcase className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span>{exp.role}</span>
                    <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">@ {exp.company}</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><FiMapPin className="text-indigo-400" /> {exp.location}</span>
                    <span className="flex items-center gap-1"><FiCalendar className="text-indigo-400" /> {exp.period}</span>
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
                {exp.type}
              </span>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3">
                  <FiCheckCircle className="text-indigo-500 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/50 dark:border-white/[0.06]">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.08]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}