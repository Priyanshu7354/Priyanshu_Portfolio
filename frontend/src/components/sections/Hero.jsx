// frontend/src/components/sections/Hero.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiArrowRight,
  FiCode,
  FiLayers,
  FiActivity,
  FiBriefcase,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaJava,
  FaDocker,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiApachekafka,
  SiRedis,
} from "react-icons/si";
import useTypingAnimation from "../../hooks/useTypingAnimation";

/* ──────────────────────────────────────────────────────────────────────
   CONSTANTS — single source of truth for content & animation config
   ────────────────────────────────────────────────────────────────────── */

const ROLES = [
  "Java Backend Developer",
  "Spring Boot & Microservices Engineer",
  "RESTful API Specialist",
  "3.2 Years Experience @ iSteer",
];

const TECH_CHIPS = [
  { label: "Java", icon: FaJava, color: "text-orange-500" },
  { label: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
  { label: "Microservices", icon: FiLayers, color: "text-indigo-500" },
  { label: "Spring Security", icon: FiCode, color: "text-emerald-500" },
  { label: "REST APIs", icon: FiCode, color: "text-blue-500" },
  { label: "MySQL", icon: SiMysql, color: "text-sky-600" },
  { label: "Kafka", icon: SiApachekafka, color: "text-purple-500" },
  { label: "Redis", icon: SiRedis, color: "text-red-500" },
  { label: "AWS", icon: FaAws, color: "text-amber-500" },
];

const STATS_CARDS = [
  {
    icon: FiBriefcase,
    label: "Experience",
    value: "3.2 Years",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: FiCode,
    label: "Primary Stack",
    value: null,
    tags: ["Java", "Spring Boot", "Kafka", "MySQL"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: FiActivity,
    label: "Current Role",
    value: null,
    lines: ["Java Developer", "@ iSteer Tech"],
    accent: "from-amber-500 to-orange-500",
  },
];

/** Stagger container — children animate in sequence */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

/** Standard fade-up variant for child elements */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Scale-fade variant for right-side elements */
const scaleFade = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const floatAnimationSlow = {
  y: [0, -8, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/* ──────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────────────────────────────── */

function AvailabilityBadge() {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
        bg-emerald-500/10 border border-emerald-500/20
        dark:bg-emerald-400/10 dark:border-emerald-400/15"
      aria-label="Currently working as Java Developer at iSteer Technologies"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className="absolute inline-flex h-full w-full rounded-full
            bg-emerald-400 opacity-75 animate-ping"
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>

      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        iSteer Technologies • May 2023 – Present
      </span>
    </motion.div>
  );
}

function TypingCursor({ isTyping }) {
  return (
    <motion.span
      animate={{ opacity: isTyping ? [1, 0, 1] : 1 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className="inline-block w-0.5 h-6 sm:h-7 lg:h-8 ml-1
        bg-indigo-500 dark:bg-indigo-400 rounded-full vertical-align-middle"
      aria-hidden="true"
    />
  );
}

function TechChip({ label, icon: Icon, color, comingSoon }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl
        text-xs font-medium
        bg-white/80 dark:bg-white/[0.04]
        border border-gray-200/80 dark:border-white/[0.08]
        shadow-sm hover:shadow-md
        backdrop-blur-sm
        transition-all duration-200
        ${comingSoon ? "opacity-75" : ""}`}
      aria-label={`Technology: ${label}`}
    >
      {Icon && <Icon className={`text-sm ${color}`} aria-hidden="true" />}
      <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      {comingSoon && (
        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Soon
        </span>
      )}
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, tags, lines, accent, index }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.03, y: -2 }}
      className="relative p-3.5 sm:p-4 rounded-2xl
        bg-white/70 dark:bg-white/[0.03]
        border border-gray-200/60 dark:border-white/[0.06]
        backdrop-blur-md shadow-sm hover:shadow-md
        transition-all duration-300 overflow-hidden group"
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[2px]
          bg-gradient-to-r ${accent} opacity-60 group-hover:opacity-100
          transition-opacity duration-300`}
        aria-hidden="true"
      />

      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400">
          <Icon className="text-sm" aria-hidden="true" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {label}
        </span>
      </div>

      {value && (
        <div className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {value}
        </div>
      )}

      {tags && (
        <div className="flex flex-wrap gap-1 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded
                bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {lines && (
        <div className="space-y-0.5 mt-0.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`text-xs ${
                i === 0
                  ? "font-bold text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 font-medium"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   HERO — main export
   ────────────────────────────────────────────────────────────────────── */

export default function Hero({ profilePic }) {
  const { displayText, isTyping } = useTypingAnimation(ROLES, 80, 45, 2200);

  const techChips = useMemo(
    () =>
      TECH_CHIPS.map((chip) => (
        <TechChip key={chip.label} {...chip} />
      )),
    []
  );

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden py-16 md:py-20 lg:py-24"
      aria-label="Hero section — Priyanshu Bhatnagar, Java Backend Developer"
    >
      {/* Background Effects */}
      <HeroBackground />

      {/* Main Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-7 order-2 lg:order-1"
        >
          {/* Professional Badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20">
              <FaJava className="text-sm" aria-hidden="true" />
              Java Backend Developer | 3.2 Years Experience
            </span>
          </motion.div>

          {/* Greeting + Name */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg font-medium text-gray-500 dark:text-gray-400 mb-2"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-gray-900 dark:text-white"
            >
              Priyanshu{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Bhatnagar
              </span>
            </motion.h1>
          </div>

          {/* Animated Role */}
          <motion.div variants={fadeUp} className="flex items-center gap-1">
            <span
              className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent"
              aria-live="polite"
              aria-label={`Current role: ${displayText}`}
            >
              {displayText}
            </span>
            <TypingCursor isTyping={isTyping} />
          </motion.div>

          {/* Professional Description */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-xl text-gray-600 dark:text-gray-400"
          >
            Java Developer with <span className="font-semibold text-gray-900 dark:text-white">3.2 years of experience</span> architecting scalable backend applications using{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Java, Spring Boot, Microservices, Spring Security, REST APIs, MySQL, Kafka, Redis
            </span>, and <span className="font-semibold text-indigo-600 dark:text-indigo-400">AWS</span>. Focused on clean architecture, domain-driven design, and maintainable software systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            {/* Primary — Download Resume */}
            <motion.a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Priyanshu_Bhatnagar_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              aria-label="Download Resume (PDF)"
            >
              <FiDownload
                className="text-base transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              Download Resume
            </motion.a>

            {/* Secondary — View Projects */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-white/60 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.1] text-gray-800 dark:text-gray-200 backdrop-blur-sm hover:bg-white dark:hover:bg-white/[0.1] hover:border-indigo-300 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              aria-label="View Projects section"
            >
              View Featured Projects
              <FiArrowRight
                className="text-base transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>

          {/* Tech Stack Chips */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2.5 pt-2"
            role="list"
            aria-label="Technology stack"
          >
            {techChips}
          </motion.div>

          {/* Availability Badge */}
          <AvailabilityBadge />
        </motion.div>

        {/* Right Side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center order-1 lg:order-2"
        >
          {/* Profile Image */}
          <motion.div
            variants={scaleFade}
            animate={floatAnimationSlow}
            className="relative z-10"
          >
            <div
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 blur-xl opacity-60"
              aria-hidden="true"
            />

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5">
              <img
                src={profilePic}
                alt="Priyanshu Bhatnagar — Java Backend Developer"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-6 w-full max-w-md lg:max-w-none">
            {STATS_CARDS.map((card, i) => (
              <StatCard key={card.label} {...card} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] bg-violet-400/15 dark:bg-violet-500/8 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}