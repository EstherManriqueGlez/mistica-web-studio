import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import Sparkle from "../common/Sparkle";

const EASE = [0.65, 0.05, 0.36, 1];

// 9 sparkles scattered across the curtain, avoiding the center where the
// text/wordmark lives. Colors drawn from the brand palette.
const SPARKLE_LAYOUT = [
  { className: "top-[16%] left-[12%] w-6 h-6 md:w-8 md:h-8", size: 32, color: "gold", delay: 0 },
  { className: "bottom-[20%] right-[14%] w-5 h-5 md:w-7 md:h-7", size: 28, color: "turquoise", delay: 1.1 },
  { className: "top-[26%] right-[18%] w-4 h-4", size: 18, color: "goldLight", delay: 0.6 },
  { className: "top-[10%] right-[8%] w-4 h-4 md:w-6 md:h-6", size: 24, color: "turquoiseLight", delay: 1.6 },
  { className: "bottom-[12%] left-[18%] w-5 h-5", size: 22, color: "gold", delay: 0.3 },
  { className: "top-[52%] left-[6%] w-5 h-5 md:w-6 md:h-6", size: 26, color: "goldLight", delay: 1.9 },
  { className: "bottom-[38%] right-[6%] w-4 h-4 md:w-6 md:h-6", size: 24, color: "turquoise", delay: 0.85 },
  { className: "top-[8%] left-[38%] w-3 h-3 md:w-4 md:h-4", size: 16, color: "goldText", delay: 1.3 },
  { className: "bottom-[8%] right-[34%] w-4 h-4", size: 20, color: "turquoiseDeep", delay: 2.1 },
];

/**
 * The site's first view: a full-screen pine-colored curtain with the
 * brand name displayed large. On scroll (or keyboard/tap, for anyone who
 * can't or doesn't want to scroll) it opens like a curtain — the top half
 * rises, the bottom half drops — revealing the real page underneath.
 *
 * It's a controlled component: App.jsx owns `revealed` so it can mark
 * the rest of the page `inert` while the curtain is active. It shows on
 * every page load (no "already seen it" persistence).
 */
export default function IntroCurtain({ revealed, onReveal }) {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const triggeredRef = useRef(revealed);

  useEffect(() => {
    triggeredRef.current = revealed;
  }, [revealed]);

  useEffect(() => {
    if (triggeredRef.current) return undefined;

    function reveal() {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      onReveal();
    }

    // Scrolling while the curtain is up should only ever reveal it — it
    // must never move the page underneath (otherwise the Hero appears
    // already scrolled once the curtain opens). `preventDefault` + non-
    // passive listeners block that real scroll at the source, instead of
    // relying solely on the body's overflow:hidden.
    function onWheel(e) {
      e.preventDefault();
      if (e.deltaY > 0) reveal();
    }
    function onTouchMove(e) {
      e.preventDefault();
      reveal();
    }
    function onKeyDown(e) {
      if (["ArrowDown", "PageDown", " ", "End", "Enter"].includes(e.key)) {
        e.preventDefault();
        reveal();
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
    // Note `revealed` in the dependency array: without it, these listeners
    // (which call preventDefault on every wheel/touchmove) stayed attached
    // forever and blocked scrolling on the entire page even after the
    // curtain opened. Including `revealed` means the effect cleans up
    // (removes the listeners) as soon as it becomes true, and since
    // `triggeredRef.current` is already true, they never get re-attached.
  }, [onReveal, revealed]);

  function handleSkipClick() {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    onReveal();
  }

  const splitTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.95, ease: EASE };

  return (
    <AnimatePresence>
      {!revealed && (
        <div className="fixed inset-0 z-[200]" aria-hidden={revealed}>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={splitTransition}
            style={{
              background: `linear-gradient(180deg, ${COLORS.pineDeep} 0%, ${COLORS.pine} 100%)`,
            }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={splitTransition}
            style={{
              background: `linear-gradient(0deg, ${COLORS.pineDeep} 0%, ${COLORS.pine} 100%)`,
            }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: EASE }}
          >
            {/* Sparkles scattered across the curtain (9 total). */}
            {SPARKLE_LAYOUT.map((s, i) => (
              <Sparkle
                key={i}
                className={`absolute z-0 ${s.className}`}
                size={s.size}
                color={COLORS[s.color]}
                delay={s.delay}
              />
            ))}

            {/* Mystic thread: appears a couple seconds after the wordmark
                (not on entry), draws itself behind the text, then fades
                out — it never stays static. */}
            {!prefersReducedMotion && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 1200 700"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                focusable="false"
              >
                <motion.path
                  d="M -50 620 C 150 500, 220 300, 340 160 C 400 90, 460 90, 500 200 C 540 320, 560 480, 620 380 C 680 280, 700 80, 780 60 C 900 30, 1050 140, 1260 90"
                  stroke={COLORS.gold}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.55, 0.55, 0] }}
                  transition={{
                    pathLength: { duration: 1.5, ease: EASE, delay: 0.5 },
                    opacity: {
                      duration: 2.6,
                      times: [0, 0.15, 0.7, 1],
                      ease: EASE,
                      delay: 0.5,
                    },
                  }}
                />
              </svg>
            )}

            <div className="relative z-10">
              <p
                className="text-xl md:text-2xl mb-3"
                style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoise }}
              >
                {t.intro.tagline}
              </p>

              {/* Not an <h1>: this is a decorative, transient layer — the
                  page's real heading lives in the Hero below. */}
              <p
                className="flex flex-wrap items-baseline justify-center gap-x-4 leading-none"
                style={{ color: COLORS.cream }}
              >
                <span
                  className="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[7.5rem]"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
                >
                  Mística
                </span>
                <span className="flex items-baseline gap-2">
                  <span
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoise }}
                  >
                    Web
                  </span>
                  <span
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ fontFamily: FONT_SCRIPT, color: COLORS.goldLight }}
                  >
                    Studio
                  </span>
                </span>
              </p>

              <button
                type="button"
                onClick={handleSkipClick}
                className="group mt-14 inline-flex flex-col items-center gap-2 rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: COLORS.cream, outlineColor: COLORS.gold }}
                aria-label={t.intro.skipIntro}
              >
                <span className="text-xs uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">
                  {t.intro.scrollHint}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { animation: "mws-bounce 1.8s ease-in-out infinite" }
                  }
                >
                  <path
                    d="M12 4v14M6 12l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
