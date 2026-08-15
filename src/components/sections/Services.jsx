import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FadeUp from "../common/FadeUp";
import ServiceCard from "./ServiceCard";
import { COLORS, FONT_DISPLAY } from "../../constants/colors";
import { SERVICE_ICONS } from "../../constants/services";
import { useLanguage } from "../../context/useLanguage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useScrollDownReveal } from "../../hooks/useScrollDownReveal";
import { initReveals } from "../../lib/reveal";

const EASE = [0.22, 1, 0.36, 1];
const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Servicios() {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // The cards are static now (see ServiceCard.jsx) — it's the section's
  // own background that carries the curtain-style color change, dropping
  // from pine to cream. One-way and scroll-down-only (useScrollDownReveal):
  // it drops once the user scrolls down into the section and then stays
  // dropped — scrolling back up doesn't undo it. `amount: 0.5` triggers it
  // a bit further into the section than a plain "just entered" check would.
  // Reduced motion just skips straight to the revealed end state.
  const scrollRevealed = useScrollDownReveal(sectionRef, { amount: 0.5 });
  const revealed = prefersReducedMotion || scrollRevealed;
  const curtainTransitionClass = prefersReducedMotion
    ? ""
    : "transition-[clip-path] duration-[1400ms] ease-in-out";
  const textTransitionClass = prefersReducedMotion
    ? ""
    : "transition-colors duration-[1400ms] ease-in-out";

  // "What we do" enters first with a lateral slide (GSAP + ScrollTrigger
  // via src/lib/reveal.js — the same generic data-attributes used in any
  // other section, firing once, well before the section reaches the
  // point where the background curtain drops) and then, further down,
  // the color change above triggers.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const cleanup = initReveals(sectionRef.current);
    return cleanup;
  }, [prefersReducedMotion]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Dark base layer: always present, pine, sits behind everything. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: COLORS.pine }}
      />

      {/* Cream curtain layer: clipped from the bottom up. `revealed` false
          -> fully hidden (curtain still raised); true -> fully dropped,
          covering the section like a curtain falling top to bottom. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${curtainTransitionClass}`}
        style={{
          background: COLORS.cream,
          clipPath: revealed ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
      />

      <div
        ref={contentRef}
        data-reveal
        data-reveal-direction="left"
        className="relative z-10 max-w-6xl mx-auto"
      >
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`uppercase text-xs tracking-[0.25em] font-medium ${textTransitionClass}`}
            style={{ color: revealed ? COLORS.turquoiseDeep : COLORS.turquoiseLight }}
          >
            {t.services.eyebrow}
          </span>
          <h2
            className={`text-3xl md:text-[2.6rem] leading-[1.15] mt-4 ${textTransitionClass}`}
            style={{ fontFamily: FONT_DISPLAY, color: revealed ? COLORS.pine : COLORS.cream }}
          >
            {t.services.title}
          </h2>
        </FadeUp>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch"
          variants={prefersReducedMotion ? undefined : gridContainer}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        >
          {SERVICE_ICONS.map((iconMeta, index) => {
            const content = t.services.items[index];
            return (
              <motion.div
                key={content.title}
                className="h-full"
                variants={prefersReducedMotion ? undefined : gridItem}
              >
                <ServiceCard
                  title={content.title}
                  items={content.items}
                  iconColor={iconMeta.iconColor}
                  Icon={iconMeta.Icon}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
