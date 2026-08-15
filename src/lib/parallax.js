import { gsap } from "./gsap";

/**
 * Continuous parallax with GSAP + ScrollTrigger, using generic attributes
 * (not tied to any particular section — "standardized" for use anywhere
 * on the site):
 *
 *   <section data-parallax-container>
 *     <img data-parallax-speed="1.3" data-parallax-axis="y" />
 *   </section>
 *
 * - data-parallax-speed: speed relative to scroll. 1 = no movement.
 *   Less than 1 (e.g. 0.8) = lags behind, looks "farther away". Greater
 *   than 1 (e.g. 1.3) = moves ahead, looks "closer". Same convention
 *   GSAP ScrollSmoother uses with `data-speed`, but hand-implemented
 *   with ScrollTrigger (same result, without having to wrap the whole
 *   page in the special wrapper ScrollSmoother requires).
 * - data-parallax-axis: "x" or "y" (default "y").
 *
 * The movement is done with `yPercent`/`xPercent` (a percentage of the
 * element's own size), so it doesn't depend on the image having already
 * loaded to calculate a pixel value — it works even if the browser
 * doesn't know the final dimensions yet.
 *
 * Returns a cleanup function (for a useEffect's cleanup).
 */
const SELECTOR = "[data-parallax-container]";

// `querySelectorAll` only searches DESCENDANTS — never the element it's
// called on. If a component passes as `root` the very same node that
// already carries the `data-parallax-container` attribute (the normal
// case: `initParallax(sectionRef.current)` with the attribute on that
// same section), `scope.querySelectorAll(SELECTOR)` silently returns an
// empty list — no error, it just finds nothing — and the function is a
// no-op. That's why there was never any console error: no ScrollTrigger
// was ever created. This helper searches both `root` itself and its
// descendants.
function queryIncludingSelf(root, selector) {
  const matches = Array.from(root.querySelectorAll(selector));
  if (typeof root.matches === "function" && root.matches(selector)) {
    matches.unshift(root);
  }
  return matches;
}

export function initParallax(root) {
  const scope = root || document;
  const containers = queryIncludingSelf(scope, SELECTOR);
  if (!containers.length) return () => {};

  const contexts = [];

  containers.forEach((container) => {
    const layers = container.querySelectorAll("[data-parallax-speed]");
    if (!layers.length) return;

    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallaxSpeed);
        if (!speed || speed === 1) return;

        const axis = layer.dataset.parallaxAxis === "x" ? "x" : "y";
        const percentProp = axis === "x" ? "xPercent" : "yPercent";

        // Symmetric: instead of starting at its normal position and
        // ending offset, it starts offset, passes through its normal
        // (unoffset) position right at the midpoint of the scroll range,
        // and ends offset the other way. That makes it look "centered"
        // when the section is halfway through its pass across the
        // screen.
        const range = (speed - 1) * 100;

        gsap.fromTo(
          layer,
          { [percentProp]: range / 2 },
          {
            [percentProp]: -range / 2,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, container);

    contexts.push(ctx);
  });

  return () => contexts.forEach((ctx) => ctx.revert());
}
