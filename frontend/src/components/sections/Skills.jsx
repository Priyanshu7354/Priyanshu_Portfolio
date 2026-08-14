// frontend/src/components/sections/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaJava,
  FaCubes,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaCodeBranch,
  FaCheckDouble,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiSpring,
  SiHibernate,
  SiMysql,
  SiJsonwebtokens,
  SiApachemaven,
  SiSwagger,
  SiPostman,
  SiKubernetes,
  SiIntellijidea,
  SiApachekafka,
  SiRedis,
  SiSpringsecurity,
  SiJenkins,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";
import { TbApi, TbDatabase } from "react-icons/tb";
import { skillCategories } from "../../data/skills";

/* ──────────────────────────────────────────────────────────────────────
   SKILL ICON MAP — maps iconName strings from data → { icon, color }
   ────────────────────────────────────────────────────────────────────── */
const SKILL_ICON_MAP = {
  Java: { icon: FaJava, color: "text-orange-500" },
  SQL: { icon: TbDatabase, color: "text-blue-500" },
  "Spring Boot": { icon: SiSpringboot, color: "text-green-500" },
  "Spring MVC": { icon: SiSpring, color: "text-emerald-500" },
  "Spring Security": { icon: SiSpringsecurity, color: "text-green-600" },
  Hibernate: { icon: SiHibernate, color: "text-amber-600" },
  "REST API": { icon: TbApi, color: "text-blue-600" },
  Microservices: { icon: FaCubes, color: "text-indigo-500" },
  Architecture: { icon: FaLayerGroup, color: "text-violet-500" },
  JWT: { icon: SiJsonwebtokens, color: "text-pink-500" },
  Kafka: { icon: SiApachekafka, color: "text-purple-500" },
  Redis: { icon: SiRedis, color: "text-red-500" },
  MySQL: { icon: SiMysql, color: "text-sky-600" },
  AWS: { icon: FaAws, color: "text-amber-500" },
  Docker: { icon: FaDocker, color: "text-blue-400" },
  Kubernetes: { icon: SiKubernetes, color: "text-blue-600" },
  Jenkins: { icon: SiJenkins, color: "text-red-500" },
  Testing: { icon: FaCheckDouble, color: "text-teal-500" },
  Git: { icon: FaGitAlt, color: "text-red-500" },
  Maven: { icon: SiApachemaven, color: "text-red-700 dark:text-red-400" },
  Postman: { icon: SiPostman, color: "text-orange-500" },
  Swagger: { icon: SiSwagger, color: "text-green-500" },
  IntelliJ: { icon: SiIntellijidea, color: "text-rose-500" },
  Agile: { icon: FaCodeBranch, color: "text-indigo-400" },
};

/** Proficiency level styling */
const LEVEL_STYLES = {
  "Core Expertise":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Proficient:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "Working Knowledge":
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

/* ──────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────── */
const sectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const badgeStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const badgeFadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ──────────────────────────────────────────────────────────────────────
   SKILL BADGE
   ────────────────────────────────────────────────────────────────────── */

function SkillBadge({ name, iconName, level }) {
  const iconDef = SKILL_ICON_MAP[iconName];
  const Icon = iconDef?.icon || FaJava;
  const colorClass = iconDef?.color || "text-indigo-500";
  const levelStyle = LEVEL_STYLES[level] || LEVEL_STYLES["Proficient"];

  return (
    <motion.div
      variants={badgeFadeUp}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.06] backdrop-blur-sm hover:bg-white dark:hover:bg-white/[0.07] hover:border-indigo-200/60 dark:hover:border-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200 cursor-default"
      role="listitem"
      aria-label={`${name}${level ? ` — ${level}` : ""}`}
    >
      <div className="w-9 h-9 rounded-lg bg-gray-100/80 dark:bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
        <Icon className={`w-[18px] h-[18px] ${colorClass}`} aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight">
          {name}
        </p>
        {level && (
          <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${levelStyle}`}>
            {level}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   SKILL CATEGORY CARD
   ────────────────────────────────────────────────────────────────────── */

function SkillCategory({ category }) {
  const { title, accent, accentText, skills } = category;

  return (
    <motion.div
      variants={cardFadeUp}
      className="relative rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl shadow-sm hover:shadow-lg hover:shadow-gray-900/5 dark:hover:shadow-black/20 hover:border-gray-300/60 dark:hover:border-white/[0.1] transition-all duration-300 overflow-hidden"
      role="group"
      aria-label={`${title} skills`}
    >
      {/* Top accent line */}
      <div className={`h-[2px] bg-gradient-to-r ${accent}`} aria-hidden="true" />

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${accent}`} aria-hidden="true" />
          <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${accentText}`}>
            {title}
          </h3>
          <span className="ml-auto text-[11px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
            {skills.length}
          </span>
        </div>

        <motion.div
          variants={badgeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          role="list"
          aria-label={`${title} skills list`}
        >
          {skills.map((skill) => (
            <SkillBadge key={skill.name} {...skill} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   SKILLS SECTION — main export
   ────────────────────────────────────────────────────────────────────── */

export default function Skills() {
  return (
    <section id="skills" className="relative mt-12 sm:mt-20 lg:mt-24 py-2 sm:py-4" aria-label="Technical Skills">
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
            Skills Taxonomy
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Technical{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Competencies & Stack
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-gray-500 dark:text-gray-400 max-w-2xl"
        >
          Structured overview of Java Backend development competencies, frameworks, database systems, cloud DevOps tools, and testing practices.
        </motion.p>
      </div>

      {/* Category Grid */}
      <motion.div
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {skillCategories.map((category) => (
          <SkillCategory key={category.id} category={category} />
        ))}
      </motion.div>
    </section>
  );
}