import { useEffect, useRef } from "react";
import FadeUp from "../common/FadeUp";
import Sparkle from "../common/Sparkle";
import { COLORS, FONT_DISPLAY } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { initParallax } from "../../lib/parallax";

// Decorative sparkles for the section, twinkling a bit faster than the
// rest of the site (2.2s instead of Sparkle's default 3.2s).
const ABOUT_SPARKLES = [
  { className: "top-[10%] left-[10%] w-5 h-5 md:w-6 md:h-6", size: 24, color: "gold", delay: 0 },
  { className: "bottom-[16%] left-[16%] w-4 h-4 md:w-5 md:h-5", size: 20, color: "turquoiseDeep", delay: 0.7 },
  { className: "bottom-[20%] right-[8%] w-4 h-4 lg:hidden", size: 18, color: "turquoise", delay: 1.1 },
  { className: "bottom-[10%] left-[46%] w-4 h-4 md:w-5 md:h-5", size: 20, color: "goldLight", delay: 0.4 },
  { className: "top-[8%] left-[42%] w-3 h-3 md:w-4 md:h-4", size: 16, color: "turquoiseLight", delay: 1.4 },
];

export default function QuienesSomos() {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  // M parallax via GSAP + ScrollTrigger, using the generic data-attributes
  // from src/lib/parallax.js (data-parallax-container + data-parallax-
  // speed): reusable in any section, not just here.
  // speed > 1 → scrolling down moves the M up; scrolling up moves it down.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const cleanup = initParallax(sectionRef.current);
    return cleanup;
  }, [prefersReducedMotion]);

  return (
    <section
      id="quienes-somos"
      ref={sectionRef}
      data-parallax-container
      className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center"
      style={{ background: COLORS.creamSoft }}
    >
      {ABOUT_SPARKLES.map((s, i) => (
        <Sparkle
          key={i}
          className={`absolute z-0 ${s.className}`}
          size={s.size}
          color={COLORS[s.color]}
          delay={s.delay}
          duration={2.2}
        />
      ))}

      {/* The M with the little hat (the favicon mark): lg+ only, per
          Dian's request — below that it's hidden entirely rather than
          showing a shrunk version. Vertically centered and flush
          against the section's right edge, with -40px of bleed
          (`right: -40px`) so it sits snugly — the section no longer has
          `overflow-hidden` (that safety net moved to `overflow-x:
          hidden` on the <body>, see index.css), because otherwise that
          bleed got clipped by the section itself and the right:-40px
          had no visible effect. The vertical centering lives on this
          wrapper div (`top-1/2 -translate-y-1/2`, a static transform);
          GSAP only animates the inner <img>, so the two transforms
          don't compete for the same property. `aspect-square` on the
          image reserves its height immediately (without waiting for the
          image to load), so ScrollTrigger calculates the parallax
          positions correctly from the first render. */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-40px] w-[280px] lg:w-[400px] xl:w-[480px] pointer-events-none z-0 overflow-visible">
        <img
          src="/favicon-512x512.png"
          alt=""
          aria-hidden="true"
          data-parallax-speed="1.6"
          data-parallax-axis="y"
          className="w-full aspect-square select-none"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeUp>
          <span
            className="uppercase text-xs tracking-[0.25em] font-medium"
            style={{ color: COLORS.turquoiseDeep }}
          >
            {t.about.eyebrow}
          </span>
          <h2
            className="text-3xl md:text-[2.7rem] leading-[1.15] mt-4"
            style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
          >
            {t.about.titleLine1} <br /> {t.about.titleLine2}
          </h2>
        </FadeUp>

        <FadeUp
          className="space-y-6 text-base leading-relaxed mt-6"
          style={{ color: COLORS.pine, opacity: 0.88 }}
          delay={0.15}
        >
          <p>
            <strong
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: "1.125rem",
                color: COLORS.gold,
              }}
            >
              {t.about.misticaWord}
            </strong>{" "}
            {t.about.misticaText}
          </p>
          <p>
            <strong
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: "1.125rem",
                color: COLORS.pine,
              }}
            >
              {t.about.webStudioWord}
            </strong>{" "}
            {t.about.webStudioText}
          </p>
          <p>{t.about.closing}</p>
        </FadeUp>
      </div>
    </section>
  );
}
