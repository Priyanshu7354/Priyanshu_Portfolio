// frontend/src/components/sections/Experience.jsx
import React from "react";

export default function Experience() {
  return (
    <section id="experience" className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Experience</h2>

      <div
        className="
        bg-white dark:bg-gray-800 
        p-6 
        rounded-xl 
        shadow 
        transition-all
        hover:shadow-xl
        hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
        dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
        hover:-translate-y-1
      "
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
          <h3 className="font-semibold text-lg">
            Java Developer — Tally Solutions
          </h3>

          <span className="text-sm text-gray-500">
            Aug 2024 – Present
          </span>
        </div>

        {/* Location */}
       <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-4">
  📍 Bengaluru, Karnataka
</p>

        {/* Responsibilities */}
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <li>
            Developed and maintained RESTful microservices using
            <strong> Spring Boot, Spring Cloud, and Spring Data JPA (Hibernate)</strong>.
          </li>

          <li>
            Implemented service discovery using <strong>Eureka Server</strong> and
            centralized request routing through <strong>Spring Cloud Gateway</strong>.
          </li>

          <li>
            Enabled secure inter-service communication using
            <strong> OpenFeign clients</strong> and optimized
            <strong> MySQL queries</strong> for improved API performance.
          </li>

          <li>
            Built centralized exception handling using
            <strong> @ControllerAdvice</strong> and collaborated in
            <strong> Agile development cycles</strong>.
          </li>
        </ul>
      </div>
    </section>
  );
}