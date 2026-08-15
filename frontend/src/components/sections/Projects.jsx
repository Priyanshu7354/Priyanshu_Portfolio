// frontend/src/components/sections/Projects.jsx
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowRight,
  FiStar,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaCubes,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiSocketdotio,
  SiJavascript,
  SiHibernate,
  SiApachekafka,
  SiRedis,
  SiSpringsecurity,
} from "react-icons/si";

/* ──────────────────────────────────────────────────────────────────────
   TECH ICON MAP — maps tech-string → { icon, color }
   ────────────────────────────────────────────────────────────────────── */
const TECH_ICON_MAP = {
  Java: { icon: FaJava, color: "text-orange-600 dark:text-orange-500" },
  "Java 8 / 17": { icon: FaJava, color: "text-orange-600 dark:text-orange-500" },
  "Spring Boot": { icon: SiSpringboot, color: "text-emerald-600 dark:text-green-500" },
  "Spring Security": { icon: SiSpringsecurity, color: "text-emerald-600 dark:text-green-500" },
  Hibernate: { icon: SiHibernate, color: "text-amber-700 dark:text-amber-600" },
  Microservices: { icon: FaCubes, color: "text-indigo-600 dark:text-indigo-400" },
  Kafka: { icon: SiApachekafka, color: "text-purple-600 dark:text-purple-400" },
  "Apache Kafka": { icon: SiApachekafka, color: "text-purple-600 dark:text-purple-400" },
  Redis: { icon: SiRedis, color: "text-red-600 dark:text-red-500" },
  MySQL: { icon: SiMysql, color: "text-sky-700 dark:text-sky-400" },
  React: { icon: FaReact, color: "text-cyan-600 dark:text-cyan-400" },
  "Node.js": { icon: FaNodeJs, color: "text-emerald-600 dark:text-green-600" },
  Express: { icon: SiExpress, color: "text-slate-700 dark:text-gray-400" },
  MongoDB: { icon: SiMongodb, color: "text-emerald-600 dark:text-green-500" },
  "Socket.io": { icon: SiSocketdotio, color: "text-slate-800 dark:text-gray-300" },
  Docker: { icon: FaDocker, color: "text-blue-600 dark:text-blue-400" },
  AWS: { icon: FaAws, color: "text-amber-600 dark:text-amber-500" },
  Git: { icon: FaGitAlt, color: "text-red-600 dark:text-red-500" },
};

/* ──────────────────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────────────────── */
const FILTER_CATEGORIES = ["All", "Java Microservices", "Full Stack"];

/** Category badge accent colors */
export const CATEGORY_COLORS = {
  "Java Microservices": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "Full Stack": "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/30",
};

/* ──────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

/* ──────────────────────────────────────────────────────────────────────
   REUSABLE SUB-COMPONENTS
   ────────────────────────────────────────────────────────────────────── */

export function TechChip({ name, size = "sm" }) {
  const tech = TECH_ICON_MAP[name];
  const Icon = tech?.icon;
  const colorClass = tech?.color || "text-slate-600 dark:text-gray-400";

  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2.5 py-1 gap-1.5"
      : "text-xs px-3 py-1.5 gap-2";

  return (
    <span
      className={`inline-flex items-center ${sizeClasses} rounded-lg
        bg-slate-100 dark:bg-white/[0.06]
        border border-slate-200/90 dark:border-white/[0.08]
        text-slate-800 dark:text-gray-300
        font-semibold whitespace-nowrap`}
    >
      {Icon && <Icon className={`${colorClass} text-sm`} aria-hidden="true" />}
      {name}
    </span>
  );
}

function CategoryBadge({ category }) {
  const colors = CATEGORY_COLORS[category] || "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md
        text-[10px] font-bold uppercase tracking-wider
        border ${colors}`}
    >
      {category}
    </span>
  );
}

function FilterTab({ label, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 whitespace-nowrap
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-gray-900
        ${
          isActive
            ? "text-white"
            : "text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]"
        }`}
      role="tab"
      aria-selected={isActive}
      aria-label={`Filter by ${label}`}
    >
      {isActive && (
        <motion.span
          layoutId="activeFilterTab"
          className="absolute inset-0 rounded-xl
            bg-gradient-to-r from-indigo-600 to-violet-600
            shadow-lg shadow-indigo-500/25"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

function PlaceholderThumbnail({ project, featured }) {
  const title = project?.title || "Project";
  const subtitle =
    project?.architecturePattern || project?.tagline || "Software Architecture & Design";

  return (
    <div
      className={`w-full ${featured ? "h-52 sm:h-60" : "h-40 sm:h-44"}
        rounded-xl overflow-hidden
        bg-gradient-to-br from-indigo-100/90 via-violet-50 to-purple-100/80
        dark:from-indigo-950/70 dark:via-violet-950/60 dark:to-purple-950/70
        border border-indigo-200/80 dark:border-indigo-500/20
        flex flex-col items-center justify-center p-6 text-center relative`}
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-600/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 mb-3 shadow-sm">
        <FaCubes className="text-2xl" />
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
        {title}
      </h4>
      <p className="text-xs font-semibold text-indigo-900/80 dark:text-indigo-200/80 mt-1 max-w-sm">
        {subtitle}
      </p>
    </div>
  );
}

function ProjectCard({ project, onSelect, featured }) {
  const handleSelect = useCallback(() => onSelect(project), [project, onSelect]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(project);
      }
    },
    [project, onSelect]
  );

  return (
    <motion.article
      variants={cardVariants}
      layout
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`group relative cursor-pointer rounded-2xl
        bg-white dark:bg-white/[0.04]
        border border-slate-200/80 dark:border-white/[0.07]
        shadow-sm shadow-slate-200/60 dark:shadow-none
        hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5
        hover:border-indigo-400/60 dark:hover:border-indigo-500/30
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
        ${featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
      aria-label={`${project.title} — ${project.tagline}. Click to view details.`}
    >
      {/* Featured ribbon */}
      {featured && (
        <div
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5
            px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
            bg-gradient-to-r from-emerald-600 to-teal-600 text-white
            border border-emerald-400/30 shadow-md shadow-emerald-600/20
            dark:from-emerald-500 dark:to-teal-500 dark:shadow-emerald-500/25"
          aria-label="Flagship Microservices Project"
        >
          <FiStar className="text-xs" aria-hidden="true" />
          Flagship Java Project
        </div>
      )}

      {/* Thumbnail */}
      <div className="p-3 pb-0">
        {project.screenshot ? (
          <div className={`w-full ${featured ? "h-52 sm:h-56" : "h-40 sm:h-44"} rounded-xl overflow-hidden`}>
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          <PlaceholderThumbnail project={project} featured={featured} />
        )}
      </div>

      {/* Card body */}
      <div className="p-5 pt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <CategoryBadge category={project.category} />
          </div>

          {/* Quick action icons */}
          <div className="flex items-center gap-2 shrink-0 mt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <FiGithub className="text-base" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, featured ? 8 : 4).map((techName) => (
            <TechChip key={techName} name={techName} size="sm" />
          ))}
          {project.tech.length > (featured ? 8 : 4) && (
            <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-gray-400 font-semibold">
              +{project.tech.length - (featured ? 8 : 4)} more
            </span>
          )}
        </div>

        {/* View Details Link */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200/80 dark:border-white/[0.06]">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline inline-flex items-center gap-1">
            View Architecture & Details <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </span>
          {project.duration && (
            <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-500">
              {project.duration}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ projectsData, setActiveProject }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [projectsData, activeCategory]);

  return (
    <section id="projects" className="relative mt-12 sm:mt-20 lg:mt-24 py-2 sm:py-4" aria-label="Projects">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20">
            Featured Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Java Backend &{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 bg-clip-text text-transparent">
            Microservices Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-slate-600 dark:text-gray-400 max-w-2xl font-normal"
        >
          Explore flagship Java microservices platforms and supporting full-stack software applications.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {FILTER_CATEGORIES.map((category) => (
          <FilterTab
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
              featured={project.featured}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
