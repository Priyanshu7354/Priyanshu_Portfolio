// frontend/src/hooks/useScrollDirection.js
import { useState, useEffect, useRef } from "react";

/**
 * Detects scroll direction and whether the page has been scrolled.
 * Uses a threshold to avoid jittery toggling on small scroll movements.
 *
 * @param {number} scrollThreshold - Minimum px scrolled before toggling direction (default: 10)
 * @returns {{ scrollDirection: "up" | "down", isScrolled: boolean }}
 */
export default function useScrollDirection(scrollThreshold = 10) {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion — if so, never hide header
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateScrollDirection = () => {
      const currentY = window.scrollY;

      // Track whether we've scrolled past the initial viewport
      setIsScrolled(currentY > 50);

      if (!prefersReducedMotion) {
        const delta = currentY - lastScrollY.current;

        if (Math.abs(delta) >= scrollThreshold) {
          setScrollDirection(delta > 0 ? "down" : "up");
          lastScrollY.current = currentY;
        }
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  return { scrollDirection, isScrolled };
}
