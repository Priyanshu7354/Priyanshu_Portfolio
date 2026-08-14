// frontend/src/data/skills.js
//
// Single source of truth for technical skills organized by core Java Backend competencies.

export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    accent: "from-amber-500 to-orange-500",
    accentText: "text-amber-600 dark:text-amber-400",
    skills: [
      { name: "Java", iconName: "Java", level: "Core Expertise" },
      { name: "Java 8 / Java 17", iconName: "Java", level: "Core Expertise" },
      { name: "SQL", iconName: "SQL", level: "Proficient" },
    ],
  },
  {
    id: "backend",
    title: "Backend Core & Frameworks",
    accent: "from-emerald-500 to-green-500",
    accentText: "text-emerald-600 dark:text-emerald-400",
    skills: [
      { name: "Spring Boot", iconName: "Spring Boot", level: "Core Expertise" },
      { name: "Spring MVC", iconName: "Spring MVC", level: "Core Expertise" },
      { name: "Spring Security", iconName: "Spring Security", level: "Core Expertise" },
      { name: "Spring Data JPA", iconName: "Hibernate", level: "Core Expertise" },
      { name: "Hibernate", iconName: "Hibernate", level: "Core Expertise" },
      { name: "RESTful APIs", iconName: "REST API", level: "Core Expertise" },
      { name: "JWT Auth", iconName: "JWT", level: "Core Expertise" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Design",
    accent: "from-indigo-500 to-violet-500",
    accentText: "text-indigo-600 dark:text-indigo-400",
    skills: [
      { name: "Microservices", iconName: "Microservices", level: "Core Expertise" },
      { name: "Domain-Driven Design (DDD)", iconName: "Architecture", level: "Proficient" },
      { name: "Event-Driven Architecture", iconName: "Kafka", level: "Proficient" },
    ],
  },
  {
    id: "database",
    title: "Databases & Caching",
    accent: "from-sky-500 to-blue-500",
    accentText: "text-sky-600 dark:text-sky-400",
    skills: [
      { name: "MySQL", iconName: "MySQL", level: "Core Expertise" },
      { name: "Redis", iconName: "Redis", level: "Proficient" },
      { name: "SQL Query Optimization", iconName: "SQL", level: "Proficient" },
      { name: "Stored Procedures", iconName: "SQL", level: "Proficient" },
    ],
  },
  {
    id: "messaging",
    title: "Messaging & Streaming",
    accent: "from-purple-500 to-fuchsia-500",
    accentText: "text-purple-600 dark:text-purple-400",
    skills: [
      { name: "Apache Kafka", iconName: "Kafka", level: "Proficient" },
    ],
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    accent: "from-orange-500 to-amber-600",
    accentText: "text-orange-600 dark:text-orange-400",
    skills: [
      { name: "AWS EC2", iconName: "AWS", level: "Working Knowledge" },
      { name: "AWS RDS", iconName: "AWS", level: "Working Knowledge" },
      { name: "AWS S3", iconName: "AWS", level: "Working Knowledge" },
      { name: "AWS ECR", iconName: "AWS", level: "Working Knowledge" },
      { name: "AWS CloudWatch", iconName: "AWS", level: "Working Knowledge" },
      { name: "Docker", iconName: "Docker", level: "Working Knowledge" },
      { name: "Kubernetes", iconName: "Kubernetes", level: "Working Knowledge" },
      { name: "Jenkins", iconName: "Jenkins", level: "Working Knowledge" },
      { name: "GitHub Actions", iconName: "Git", level: "Working Knowledge" },
    ],
  },
  {
    id: "testing",
    title: "Testing & Quality Assurance",
    accent: "from-teal-500 to-cyan-500",
    accentText: "text-teal-600 dark:text-teal-400",
    skills: [
      { name: "JUnit", iconName: "Testing", level: "Proficient" },
      { name: "Mockito", iconName: "Testing", level: "Proficient" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools & APIs",
    accent: "from-blue-600 to-indigo-600",
    accentText: "text-blue-600 dark:text-blue-400",
    skills: [
      { name: "Git & GitHub", iconName: "Git", level: "Core Expertise" },
      { name: "Maven", iconName: "Maven", level: "Core Expertise" },
      { name: "Postman", iconName: "Postman", level: "Core Expertise" },
      { name: "Swagger / OpenAPI", iconName: "Swagger", level: "Core Expertise" },
      { name: "IntelliJ IDEA", iconName: "IntelliJ", level: "Core Expertise" },
    ],
  },
  {
    id: "other",
    title: "Libraries, Patterns & Practices",
    accent: "from-rose-500 to-pink-500",
    accentText: "text-rose-600 dark:text-rose-400",
    skills: [
      { name: "Lombok", iconName: "Java", level: "Proficient" },
      { name: "ModelMapper", iconName: "Java", level: "Proficient" },
      { name: "SOLID Principles", iconName: "Architecture", level: "Core Expertise" },
      { name: "Design Patterns", iconName: "Architecture", level: "Core Expertise" },
      { name: "SLF4J / Logback", iconName: "Java", level: "Proficient" },
      { name: "Agile / Scrum", iconName: "Agile", level: "Core Expertise" },
    ],
  },
];

export const experienceOverview = {
  totalYears: "3.2 Years",
  currentRole: "Software Engineer – Java Developer",
  company: "iSteer Technologies",
  period: "May 2023 – Present",
  specialization: "Spring Boot Microservices, RESTful APIs & Relational Database Optimization",
};
