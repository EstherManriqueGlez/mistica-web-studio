import { useLanguage } from "../../context/useLanguage";
import { COLORS } from "../../constants/colors";

/**
 * EN / ES language selector. Implemented as a group of two buttons
 * (not an <input type="checkbox"> "switch") because we're choosing
 * between two named options, not toggling something on/off: a button
 * group with aria-pressed is clearer for screen reader users than a
 * binary switch with no visible labels.
 */
export default function LanguageSwitch({ className = "" }) {
  const { lang, setLang, t } = useLanguage();

  const baseBtn =
    "px-2.5 py-1 text-xs font-semibold rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${className}`}
      style={{ borderColor: "rgba(18,59,55,0.25)" }}
    >
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={baseBtn}
        style={{
          background: lang === "en" ? COLORS.pine : "transparent",
          color: lang === "en" ? COLORS.cream : COLORS.pine,
          outlineColor: COLORS.gold,
        }}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        className={baseBtn}
        style={{
          background: lang === "es" ? COLORS.pine : "transparent",
          color: lang === "es" ? COLORS.cream : COLORS.pine,
          outlineColor: COLORS.gold,
        }}
      >
        ES
      </button>
    </div>
  );
}
