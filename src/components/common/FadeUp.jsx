import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Wraps content with a scroll-triggered fade-in-up animation
 * (IntersectionObserver via framer-motion's `whileInView`, not just on
 * mount): each section comes to life once the user actually reaches it.
 * `once: true` keeps it from re-animating every time it leaves and
 * re-enters the viewport, keeping things light.
 */
export default function FadeUp({
  children,
  className = "",
  style = {},
  delay = 0,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
