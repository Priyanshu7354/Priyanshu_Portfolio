// src/data/certificates.js

/**
 * Dynamically resolves full absolute URL for assets in public/ directory.
 * Works seamlessly across local dev (http://localhost:5173/) and GitHub Pages (https://priyanshu7354.github.io/Priyanshu_Portfolio/).
 */
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.replace(/^\//, "");
  const relativeWithBase = base.endsWith("/") ? `${base}${cleanPath}` : `${base}/${cleanPath}`;

  if (typeof window !== "undefined" && window.location?.origin) {
    const origin = window.location.origin;
    const cleanOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;
    const cleanRelative = relativeWithBase.startsWith("/") ? relativeWithBase : `/${relativeWithBase}`;
    return `${cleanOrigin}${cleanRelative}`;
  }

  return relativeWithBase;
};

export const certificates = [
  {
    id: "databricks-genai",
    title: "Get Started with Databricks for Generative AI",
    src: getAssetUrl("certificates/Databricks.pdf"),
    fileName: "Databricks.pdf",
    type: "pdf",
  },
  {
    id: "genai-visual-prompts",
    title: "Generate Visual Prompts With AI (GenAI)",
    src: getAssetUrl("certificates/generate_visual_prompts_genai.pdf"),
    fileName: "generate_visual_prompts_genai.pdf",
    type: "pdf",
  },
  {
    id: "react-bootcamp",
    title: "React Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/react.pdf"),
    fileName: "react.pdf",
    type: "pdf",
  },
  {
    id: "nodejs-bootcamp",
    title: "Node.js Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/nodejs.pdf"),
    fileName: "nodejs.pdf",
    type: "pdf",
  },
  {
    id: "git-bootcamp",
    title: "Git & GitHub Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/git.pdf"),
    fileName: "git.pdf",
    type: "pdf",
  },
  {
    id: "sql-bootcamp",
    title: "SQL Bootcamp — LetsUpgrade",
    src: getAssetUrl("certificates/sql.pdf"),
    fileName: "sql.pdf",
    type: "pdf",
  },
];


