import React, { useState } from "react";
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

export default function Contact() {
  const [copied, setCopied] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ================= COPY TO CLIPBOARD =================
  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const copyToClipboard = async (text, type) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // ================= FORM HANDLING =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= EMAILJS SEND =================
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_18x6ton", // your service ID
        "template_6mfgwbh", // your template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "tbxl0HO8CFmUeRFyu", // your EmailJS public key
      )
      .then(() => {
        alert("Message Sent Successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send message");
      });
  };

  return (
    <FadeInWhenVisible delay={0.4}>
      <section id="contact" className="mt-24 space-y-20">
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
          <div className="p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow transition-all hover:shadow-xl hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] dark:hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.7)] hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-indigo-500" />
                  <span className="font-medium">pbhatnagar631@gmail.com</span>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard("pbhatnagar631@gmail.com", "email")
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
                  <FaPhoneAlt className="text-indigo-500" />
                  <span className="font-medium">+91 7354352931</span>
                </div>

                <button
                  onClick={() => copyToClipboard("+917354352931", "phone")}
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
                <FaMapMarkerAlt className="text-indigo-500" />
                <span className="font-medium">Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* -------- Contact Form -------- */}
          <div className="p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Send Me a Message
            </h3>

            <p className="text-indigo-100 text-center mb-8">
              Use the form and I’ll respond as soon as possible.
            </p>

            <form onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              />

              <button
                type="submit"
                className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:scale-105 transition"
              >
                Send Message
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
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-110"
            >
              <FaGithub className="text-xl" />
            </a>

            <a
              href="https://www.linkedin.com/in/priyanshu-bhatnagar45/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-110"
            >
              <FaLinkedin className="text-xl text-blue-600" />
            </a>

            <a
              href="https://leetcode.com/u/pbhatnagar631/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-110"
            >
              <SiLeetcode className="text-xl text-orange-500" />
            </a>

            <a
              href="https://auth.geeksforgeeks.org/user/pbhatnagar"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-110"
            >
              <SiGeeksforgeeks className="text-xl text-green-600" />
            </a>

            <a
              href="https://www.instagram.com/priyanshu_bhatnagar_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-110"
            >
              <FaInstagram className="text-xl text-pink-500" />
            </a>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
