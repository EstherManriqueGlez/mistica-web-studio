import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Tracks whether a section has been scrolled into view while the user was
 * actively scrolling DOWN, and never un-reveals: scrolling back up neither
 * triggers it early nor cancels it once it has fired. Built for one-way
 * "curtain drop" background reveals (Services, Contact) that should only
 * ever animate on the way down the page, per Dian's request — scrolling
 * back up should leave whichever state was already showing untouched.
 *
 * `ref` is the element to watch; `amount` (0-1) is how much of it needs
 * to be in the viewport before it's eligible to trigger (same meaning as
 * framer-motion's `useInView` `amount` option).
 */
export function useScrollDownReveal(ref, { amount = 0.5 } = {}) {
  const [revealed, setRevealed] = useState(false);
  const directionRef = useRef("down");
  const lastYRef = useRef(0);
  const inView = useInView(ref, { amount });

  useEffect(() => {
    lastYRef.current = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y !== lastYRef.current) {
        directionRef.current = y > lastYRef.current ? "down" : "up";
      }
      lastYRef.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only fires the very moment `inView` flips to true while the last known
  // scroll direction was "down" — scrolling up either before or after that
  // point is intentionally ignored.
  useEffect(() => {
    if (inView && directionRef.current === "down") {
      setRevealed(true);
    }
  }, [inView]);

  return revealed;
}
