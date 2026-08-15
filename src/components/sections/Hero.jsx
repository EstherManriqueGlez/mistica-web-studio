import { motion } from "framer-motion";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import heroVideo from "../../assets/hero-video.mp4";
import heroPoster from "../../assets/hero-poster.jpg";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Cinematic hero: full-screen background video (inspired by unseen.co),
 * with a dark pine-toned scrim so the text stays legible no matter which
 * video frame is showing. Content only enters once `revealed` is true,
 * so the animation stays synced with the moment the intro curtain opens
 * instead of firing (and finishing) while that curtain still covers
 * everything.
 */
export default function Hero({ revealed = true }) {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: COLORS.pineDeep }}
    >
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <img
            src={heroPoster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        {/* Scrim: guarantees text contrast no matter the video frame,
            and gives it the brand's pine/gold patina. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(11,38,36,0.78) 0%, rgba(11,38,36,0.55) 45%, rgba(11,38,36,0.88) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-60"
          style={{
            background: `radial-gradient(120% 90% at 50% 10%, ${COLORS.pine} 0%, ${COLORS.pineDeep} 70%)`,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6 py-32 md:py-40"
        variants={container}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
      >
        <motion.p
          variants={item}
          className="text-2xl md:text-3xl mb-4"
          style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoiseLight }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[2.6rem] leading-[1.08] md:text-7xl md:leading-[1.05] font-medium tracking-tight"
          style={{ fontFamily: FONT_DISPLAY, color: COLORS.cream }}
        >
          {t.hero.titleLine1}
          <br className="hidden md:block" />
          {t.hero.titleConnector}{" "}
          <span style={{ color: COLORS.goldLight }}>
            {t.hero.titleHighlight}
          </span>{" "}
          {t.hero.titleSuffix}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: COLORS.cream, opacity: 0.85 }}
        >
          {t.hero.paragraph}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contacto"
            className="mws-btn-primary rounded-full px-9 py-4 font-medium text-[15px] tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: COLORS.gold,
              color: COLORS.pineDeep,
              outlineColor: COLORS.cream,
            }}
          >
            {t.hero.ctaPrimary}
          </a>

          <a
            href="#servicios"
            className="rounded-full px-9 py-4 font-medium text-[15px] tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              border: `1.5px solid ${COLORS.cream}`,
              color: COLORS.cream,
              outlineColor: COLORS.gold,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.cream;
              e.currentTarget.style.color = COLORS.pineDeep;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = COLORS.cream;
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 inset-x-0 flex justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0.75 : 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? undefined
              : { animation: "mws-bounce 1.8s ease-in-out infinite" }
          }
        >
          <rect
            x="1"
            y="1"
            width="18"
            height="26"
            rx="9"
            stroke={COLORS.cream}
            strokeWidth="1.3"
          />
          <circle cx="10" cy="9" r="2" fill={COLORS.goldLight} />
        </svg>
      </motion.div>
    </section>
  );
}
