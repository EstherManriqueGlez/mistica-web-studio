import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitial() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * True if the user has requested reduced motion at the OS level. The
 * "magical" animations (intro curtain, video hero, scroll reveals) must
 * respect this: WCAG 2.3.3, and out of consideration for people with
 * vestibular disorders.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
