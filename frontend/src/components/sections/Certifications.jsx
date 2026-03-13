// frontend/src/components/sections/Certifications.jsx
import React from "react";

export default function Certifications({ certificates, setActiveCertificate }) {
  return (
    <section id="certifications" className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="
              p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow transition-all
              hover:shadow-xl
              hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
              dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]
              hover:-translate-y-1
            "
          >
            <h3 className="font-semibold text-indigo-400 text-lg">
              {cert.title}
            </h3>
            <button
              onClick={() => setActiveCertificate(cert)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:scale-105 transition"
            >
              View Certificate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}