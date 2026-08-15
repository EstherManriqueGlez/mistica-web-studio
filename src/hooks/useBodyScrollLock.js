import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";

/**
 * Locks <body> scroll while `active` is true. Uses a shared counter
 * because more than one component may need the lock at the same time
 * (the intro curtain and the mobile menu, for example) — without this,
 * whichever one closes second would restore scrolling even if the first
 * one is still active.
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [active]);
}
