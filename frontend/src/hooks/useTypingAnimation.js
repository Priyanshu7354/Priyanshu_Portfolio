// frontend/src/hooks/useTypingAnimation.js
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for a typing/deleting animation that cycles through roles.
 *
 * @param {string[]} roles - Array of role strings to cycle through
 * @param {object} options - Timing configuration
 * @param {number} options.typingSpeed - ms per character when typing (default: 80)
 * @param {number} options.deletingSpeed - ms per character when deleting (default: 40)
 * @param {number} options.pauseDuration - ms to pause after typing completes (default: 2000)
 * @returns {{ displayText: string, isTyping: boolean }}
 */
export default function useTypingAnimation(
  roles = [],
  { typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000 } = {}
) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef("typing"); // "typing" | "pausing" | "deleting"

  // Check if user prefers reduced motion
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const tick = useCallback(() => {
    const currentRole = roles[roleIndexRef.current];
    if (!currentRole) return;

    const phase = phaseRef.current;

    if (phase === "typing") {
      if (charIndexRef.current < currentRole.length) {
        charIndexRef.current += 1;
        setDisplayText(currentRole.slice(0, charIndexRef.current));
        setIsTyping(true);
      } else {
        phaseRef.current = "pausing";
        setIsTyping(false);
      }
    } else if (phase === "deleting") {
      if (charIndexRef.current > 0) {
        charIndexRef.current -= 1;
        setDisplayText(currentRole.slice(0, charIndexRef.current));
        setIsTyping(true);
      } else {
        // Move to next role
        roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
        phaseRef.current = "typing";
      }
    }
  }, [roles]);

  useEffect(() => {
    // For reduced motion, just show the first role statically
    if (prefersReducedMotion.current) {
      setDisplayText(roles[0] || "");
      setIsTyping(false);
      return;
    }

    let timeoutId;

    const schedule = () => {
      const phase = phaseRef.current;
      let delay;

      if (phase === "typing") {
        delay = typingSpeed;
      } else if (phase === "pausing") {
        delay = pauseDuration;
        phaseRef.current = "deleting";
      } else {
        delay = deletingSpeed;
      }

      timeoutId = setTimeout(() => {
        tick();
        schedule();
      }, delay);
    };

    schedule();

    return () => clearTimeout(timeoutId);
  }, [tick, typingSpeed, deletingSpeed, pauseDuration, roles]);

  return { displayText, isTyping };
}
