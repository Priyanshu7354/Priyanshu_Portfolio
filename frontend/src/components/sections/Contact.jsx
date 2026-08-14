import React, { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

/* ──────────────────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────────────────── */
const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/** Duration (ms) to show copy-success and form-status messages */
const FEEDBACK_DURATION = 3000;
const COPY_FEEDBACK_DURATION = 2000;

/* ──────────────────────────────────────────────────────────────────────
   FORM FIELD CONFIG
   ────────────────────────────────────────────────────────────────────── */
const FORM_FIELDS = [
  {
    name: "name",
    type: "text",
    placeholder: "Your Name",
    label: "Full name",
    element: "input",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email",
    label: "Email address",
    element: "input",
  },
  {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    label: "Message subject",
    element: "input",
  },
  {
    name: "message",
    type: "text",
    placeholder: "Your Message",
    label: "Message body",
    element: "textarea",
    rows: 4,
  },
];

/* ──────────────────────────────────────────────────────────────────────
   INLINE STATUS BANNER
   ────────────────────────────────────────────────────────────────────── */
function StatusBanner({ status }) {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-300 animate-fade-in
        ${
          isSuccess
            ? "bg-green-100/90 text-green-800 border border-green-200"
            : "bg-red-100/90 text-red-800 border border-red-200"
        }`}
    >
      {isSuccess ? (
        <FaCheck className="text-green-600 shrink-0" aria-hidden="true" />
      ) : (
        <svg
          className="w-4 h-4 text-red-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {status.message}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────────────── */
export default function Contact() {
  const [copied, setCopied] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // { type, message }

  // Refs for focusing the first invalid field
  const fieldRefs = useRef({});

  // ================= COPY TO CLIPBOARD =================
  const fallbackCopy = useCallback((text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch {
      // Silently fail — clipboard not supported
    }
    document.body.removeChild(textarea);
  }, []);

  const copyToClipboard = useCallback(
    async (text, type) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          fallbackCopy(text);
        }
        setCopied(type);
        setTimeout(() => setCopied(""), COPY_FEEDBACK_DURATION);
      } catch {
        // If copy fails, still show brief visual feedback
        fallbackCopy(text);
        setCopied(type);
        setTimeout(() => setCopied(""), COPY_FEEDBACK_DURATION);
      }
    },
    [fallbackCopy]
  );

  // ================= VALIDATION =================
  const validateField = useCallback((name, value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      const labels = {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      };
      return `${labels[name]} is required.`;
    }
    if (name === "email" && !EMAIL_REGEX.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    return "";
  }, []);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let firstInvalid = null;

    for (const field of FORM_FIELDS) {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        if (!firstInvalid) firstInvalid = field.name;
      }
    }

    setErrors(newErrors);

    // Focus first invalid field
    if (firstInvalid && fieldRefs.current[firstInvalid]) {
      fieldRefs.current[firstInvalid].focus();
    }

    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // ================= FORM HANDLING =================
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }

      // Clear form-level status when user starts typing again
      if (formStatus) {
        setFormStatus(null);
      }
    },
    [errors, formStatus]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField]
  );

  // ================= EMAILJS SEND =================
  const sendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      // Prevent duplicate submissions
      if (isSubmitting) return;

      // Clear any previous status
      setFormStatus(null);

      // Validate all fields
      if (!validateAll()) return;

      // Check EmailJS configuration
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        setFormStatus({
          type: "error",
          message:
            "Email service is not configured. Please contact me directly.",
        });
        if (import.meta.env.DEV) {
          console.error(
            "[Contact] Missing EmailJS env vars. Check .env file for VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY."
          );
        }
        return;
      }

      setIsSubmitting(true);

      try {
        // Trim all values before sending
        const trimmedData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          time: new Date().toLocaleString("en-IN"),
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          trimmedData,
          EMAILJS_PUBLIC_KEY
        );

        // Success
        setFormData(INITIAL_FORM);
        setErrors({});
        setFormStatus({
          type: "success",
          message:
            "Message sent successfully! I'll get back to you soon.",
        });

        // Auto-clear success message
        setTimeout(() => setFormStatus(null), FEEDBACK_DURATION);
      } catch (error) {
        // Graceful error handling
        if (import.meta.env.DEV) {
          console.error("[Contact] EmailJS send failed:", error);
        }

        let userMessage =
          "Failed to send message. Please try again or reach out directly via email.";

        // Provide more specific feedback for common errors
        if (error?.status === 0 || error?.message?.includes("network")) {
          userMessage =
            "Network error — please check your connection and try again.";
        } else if (error?.status === 429) {
          userMessage = "Too many requests. Please wait a moment and try again.";
        }

        setFormStatus({ type: "error", message: userMessage });
      } finally {
        // Never leave stuck in loading state
        setIsSubmitting(false);
      }
    },
    [formData, isSubmitting, validateAll]
  );

  // ================= RENDER HELPERS =================
  const renderField = useCallback(
    (field) => {
      const hasError = !!errors[field.name];
      const errorId = `${field.name}-error`;

      const sharedClasses = `w-full px-4 py-3 rounded-lg text-gray-900
        bg-white/95 placeholder-gray-400
        border transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-white/50
        ${
          hasError
            ? "border-red-300 focus:border-red-400"
            : "border-transparent focus:border-white/30"
        }`;

      const sharedProps = {
        name: field.name,
        placeholder: field.placeholder,
        value: formData[field.name],
        onChange: handleChange,
        onBlur: handleBlur,
        "aria-label": field.label,
        "aria-invalid": hasError,
        "aria-describedby": hasError ? errorId : undefined,
        disabled: isSubmitting,
        ref: (el) => {
          fieldRefs.current[field.name] = el;
        },
      };

      return (
        <div key={field.name}>
          {field.element === "textarea" ? (
            <textarea
              {...sharedProps}
              rows={field.rows}
              className={`${sharedClasses} resize-none`}
            />
          ) : (
            <input
              {...sharedProps}
              type={field.type}
              className={sharedClasses}
            />
          )}
          {hasError && (
            <p
              id={errorId}
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-200 flex items-center gap-1"
            >
              <svg
                className="w-3 h-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01"
                />
              </svg>
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    },
    [formData, errors, handleChange, handleBlur, isSubmitting]
  );

  return (
    <FadeInWhenVisible delay={0.4}>
      <section
        id="contact"
        className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-20"
        aria-label="Contact"
      >

        {/* ================= HEADING ================= */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Get In <span className="text-indigo-500">Touch</span>
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Interested in working together or just want to say hello?
          </p>
        </div>

        {/* ================= CONTACT + FORM ================= */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* -------- Contact Info -------- */}
          <div className="p-6 bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Contact Information</h3>

            <div className="space-y-5">

              {/* Email */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-indigo-500" aria-hidden="true" />
                  <span className="font-medium text-xs sm:text-base break-all sm:break-normal">
                    pbhatnagar631@gmail.com
                  </span>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard("pbhatnagar631@gmail.com", "email")
                  }
                  className="p-2 rounded-lg transition-colors
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-indigo-500"
                  aria-label={
                    copied === "email"
                      ? "Email copied to clipboard"
                      : "Copy email to clipboard"
                  }
                >
                  {copied === "email" ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy className="text-indigo-500" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-indigo-500" aria-hidden="true" />
                  <span className="font-medium">+91 7354352931</span>
                </div>

                <button
                  onClick={() => copyToClipboard("+917354352931", "phone")}
                  className="p-2 rounded-lg transition-colors
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-indigo-500"
                  aria-label={
                    copied === "phone"
                      ? "Phone copied to clipboard"
                      : "Copy phone to clipboard"
                  }
                >
                  {copied === "phone" ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy className="text-indigo-500" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-indigo-500" aria-hidden="true" />
                <span className="font-medium">Bangalore, India</span>
              </div>

            </div>
          </div>

          {/* -------- Contact Form -------- */}
          <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Send Me a Message
            </h3>

            <p className="text-indigo-100 text-center mb-8">
              Use the form and I'll respond as soon as possible.
            </p>

            <form
              onSubmit={sendEmail}
              className="space-y-4"
              noValidate
              aria-label="Contact form"
            >
              {/* Form status banner */}
              <StatusBanner status={formStatus} />

              {/* Form fields */}
              {FORM_FIELDS.map(renderField)}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 font-semibold rounded-xl shadow-md
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-offset-2
                  focus-visible:ring-offset-indigo-600
                  ${
                    isSubmitting
                      ? "bg-white/70 text-indigo-400 cursor-not-allowed scale-[0.98]"
                      : "bg-white text-indigo-600 hover:scale-105 active:scale-[0.98]"
                  }`}
                aria-label={isSubmitting ? "Sending message…" : "Send message"}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-6">Connect With Me</h3>

          <div className="flex justify-center gap-6 flex-wrap">

            <a
              href="https://github.com/Priyanshu7354"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200"
              aria-label="GitHub profile"
            >
              <FaGithub className="text-xl text-gray-800 dark:text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/priyanshu-bhatnagar45/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="text-xl text-blue-600" />
            </a>

            <a
              href="https://leetcode.com/u/pbhatnagar631/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200"
              aria-label="LeetCode profile"
            >
              <SiLeetcode className="text-xl text-orange-500" />
            </a>

            <a
              href="https://auth.geeksforgeeks.org/user/pbhatnagar"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200"
              aria-label="GeeksforGeeks profile"
            >
              <SiGeeksforgeeks className="text-xl text-green-600" />
            </a>

            <a
              href="https://www.instagram.com/priyanshu_bhatnagar_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200"
              aria-label="Instagram profile"
            >
              <FaInstagram className="text-xl text-pink-500" />
            </a>

          </div>
        </div>

      </section>
    </FadeInWhenVisible>
  );
}