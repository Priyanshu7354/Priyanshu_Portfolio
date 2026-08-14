// frontend/src/components/sections/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiServer, FiShield, FiCpu, FiTerminal, FiCheckCircle } from "react-icons/fi";
import { FaJava } from "react-icons/fa";

const HIGHLIGHTS = [
  {
    icon: FiServer,
    title: "Microservices & DDD Architecture",
    description: "Designing decoupled, fault-tolerant Java microservices adhering to Domain-Driven Design (DDD) principles.",
  },
  {
    icon: FiShield,
    title: "Security & Authentication",
    description: "Building stateless authorization layers using Spring Security, OAuth2, and JWT token lifecycles with RBAC.",
  },
  {
    icon: FiCpu,
    title: "Event-Driven & Caching",
    description: "Streaming asynchronous events via Apache Kafka and leveraging Redis distributed caching to eliminate database query bottlenecks.",
  },
  {
    icon: FiTerminal,
    title: "Database & Cloud DevOps",
    description: "Optimizing MySQL JPA/Hibernate query execution, stored procedures, and deploying services across AWS, Docker, and Kubernetes.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative mt-12 sm:mt-20 lg:mt-24 py-2 sm:py-4" aria-label="About Me">
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
            About Me
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Architecting{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Scalable Java Systems
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-gray-500 dark:text-gray-400 max-w-2xl"
        >
          Dedicated Java Backend Developer specializing in production-ready microservices, event-driven streaming, and database persistence layers.
        </motion.p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Narrative Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
        >
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              Hello! I'm <strong className="text-gray-900 dark:text-white font-bold">Priyanshu Bhatnagar</strong>, a Java Backend Developer with <span className="font-semibold text-indigo-600 dark:text-indigo-400">3.2 years of professional experience</span> engineering high-performance web services, microservices, and database persistence architecture.
            </p>
            <p>
              Currently serving as a Software Engineer – Java Developer at <strong className="text-gray-900 dark:text-white">iSteer Technologies</strong> (May 2023 – Present), I collaborate in Agile sprint cycles to design and maintain production-ready RESTful APIs, Spring Boot microservices, and event-driven architectures.
            </p>
            <p>
              My technical expertise centers on <span className="font-semibold text-indigo-600 dark:text-indigo-400">Java (Java 8 / Java 17), Spring Boot, Spring MVC, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, Redis, Apache Kafka, AWS, and Docker</span>. I focus on domain-driven design, clean architecture, and test-driven reliability using JUnit and Mockito.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <FiCheckCircle className="text-emerald-500 text-sm shrink-0" /> 3.2 Years Production Experience
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <FiCheckCircle className="text-emerald-500 text-sm shrink-0" /> Domain-Driven Design & Microservices
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <FiCheckCircle className="text-emerald-500 text-sm shrink-0" /> Spring Security & JWT Auth
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <FiCheckCircle className="text-emerald-500 text-sm shrink-0" /> Kafka Messaging & Redis Caching
            </div>
          </div>
        </motion.div>

        {/* Right Column: Highlights Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-md p-5 shadow-sm hover:border-indigo-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
