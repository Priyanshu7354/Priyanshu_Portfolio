// frontend/src/components/sections/Projects.jsx
import React from "react";
import TiltCard from "../animations/TiltCard";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

export default function Projects({ projectsData, setActiveProject }) {
  return (
    <section id="projects" className="mt-20">
      <h2 className="text-3xl font-bold mb-8 tracking-tight">
        Selected Projects
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projectsData.map((p, i) => (
          <FadeInWhenVisible key={p.id} delay={i * 0.1}>
            <TiltCard>
              <article
                role="button"
                tabIndex={0}
                onClick={() => setActiveProject(p)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setActiveProject(p)
                }
                className="
                  group cursor-pointer
                  bg-white/90 dark:bg-gray-800/90
                  backdrop-blur
                  p-5 rounded-2xl
                  shadow-md
                  border border-transparent
                  transition-all duration-300
                  hover:shadow-xl
                  hover:-translate-y-1
                  hover:border-indigo-400/40
                  hover:drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]
                  dark:hover:drop-shadow-[0_0_22px_rgba(129,140,248,0.6)]
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-500
                "
              >
                {/* Project Thumbnail */}
                <div
                  className="
                    h-36 rounded-lg
                    bg-gradient-to-br
                    from-sky-300 to-indigo-300
                    dark:from-indigo-500/30 dark:to-purple-600/30
                    flex items-center justify-center
                    text-lg font-semibold text-gray-800 dark:text-gray-100
                    group-hover:scale-[1.02]
                    transition-transform
                  "
                >
                  {p.title}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {p.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-4 flex gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="
                        text-xs px-2.5 py-1
                        rounded-full
                        bg-gray-200 dark:bg-gray-700
                        text-gray-700 dark:text-gray-200
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 text-indigo-500 text-sm font-medium">
                  View details →
                </div>
              </article>
            </TiltCard>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
