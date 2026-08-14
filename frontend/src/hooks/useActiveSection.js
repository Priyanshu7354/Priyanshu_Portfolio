// frontend/src/hooks/useActiveSection.js
import { useEffect, useState, useRef } from "react";

/**
 * Tracks which section is currently visible in the viewport using
 * IntersectionObserver (no scroll listeners).
 *
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @param {object} options
 * @param {string} options.rootMargin - IntersectionObserver rootMargin (default: "-20% 0px -75% 0px")
 * @param {number} options.threshold - Visibility threshold (default: 0)
 * @returns {string} The ID of the currently active (most visible) section
 */
export default function useActiveSection(
  sectionIds,
  { rootMargin = "-20% 0px -75% 0px", threshold = 0 } = {}
) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    // Disconnect any existing observer
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting (most recently scrolled into view)
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin, threshold }
    );

    observerRef.current = observer;

    // Observe all section elements
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}
