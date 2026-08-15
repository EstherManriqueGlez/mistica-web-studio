import FadeUp from "../common/FadeUp";
import { COLORS, FONT_DISPLAY } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";

export default function QuienesSomos() {
  const { t } = useLanguage();

  return (
    <section
      id="quienes-somos"
      className="relative px-6 py-24 md:py-32"
      style={{ background: COLORS.creamSoft }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.15fr] gap-14 md:gap-20 items-center">
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
          className="space-y-6 text-base leading-relaxed"
          style={{ color: COLORS.pine, opacity: 0.88 }}
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
