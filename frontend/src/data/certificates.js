// src/data/certificates.js

const BASE_URL = import.meta.env.BASE_URL || "/";

export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (BASE_URL !== "/" && path.startsWith(BASE_URL)) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${cleanBase}${cleanPath}`;
};

export const certificates = [
  {
    title: "Get Started with Databricks for Generative AI",
    src: getAssetUrl("certificates/Databricks.pdf"),
    type: "pdf",
  },
  {
    title: "Generate Visual Prompts With AI (GenAI)",
    src: getAssetUrl("certificates/generate_visual_prompts_genai.pdf"),
    type: "pdf",
  },
  {
    title: "React Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/react.pdf"),
    type: "pdf",
  },
  {
    title: "Node.js Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/nodejs.pdf"),
    type: "pdf",
  },
  {
    title: "Git & GitHub Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/git.pdf"),
    type: "pdf",
  },
  {
    title: "SQL Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/sql.pdf"),
    type: "pdf",
  },
];

