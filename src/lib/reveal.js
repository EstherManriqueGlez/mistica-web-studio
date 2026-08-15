import { gsap } from "./gsap";

const REVEAL_OFFSETS = {
  left: { x: -60 },
  right: { x: 60 },
  up: { y: -60 },
  down: { y: 60 },
};

/**
 * Directional reveal with GSAP + ScrollTrigger, also using generic
 * attributes reusable in any section:
 *
 *   <div data-reveal data-reveal-direction="left" data-reveal-duration="1">
 *     ...content...
 *   </div>
 *
 * - data-reveal-direction: "left" | "right" | "up" | "down" (default "up").
 * - data-reveal-duration: seconds (default 1).
 *
 * Unlike parallax (continuous, tied to scroll via scrub), this is a
 * "one-time" animation: it fires as soon as the element enters the
 * viewport and doesn't repeat.
 *
 * Returns a cleanup function (for a useEffect's cleanup).
 */
// Same as parallax.js: searches for the selector both on `root` itself
// and its descendants, because `querySelectorAll` never matches the
// element it's called on.
function queryIncludingSelf(root, selector) {
  const matches = Array.from(root.querySelectorAll(selector));
  if (typeof root.matches === "function" && root.matches(selector)) {
    matches.unshift(root);
  }
  return matches;
}

export function initReveals(root) {
  const scope = root || document;
  const elements = queryIncludingSelf(scope, "[data-reveal]");
  if (!elements.length) return () => {};

  const ctx = gsap.context(() => {
    elements.forEach((el) => {
      const direction = el.dataset.revealDirection || "up";
      const offset = REVEAL_OFFSETS[direction] || REVEAL_OFFSETS.up;
      const duration = parseFloat(el.dataset.revealDuration) || 1;

      gsap.fromTo(
        el,
        { ...offset, autoAlpha: 0 },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, scope);

  return () => ctx.revert();
}
