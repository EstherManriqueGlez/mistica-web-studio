import { useLanguage } from "../../context/useLanguage";
import { COLORS } from "../../constants/colors";

/**
 * Selector de idioma EN / ES. Se implementa como un grupo de dos botones
 * (no como un <input type="checkbox"> "switch") porque estamos eligiendo
 * entre dos opciones con nombre propio, no encendiendo/apagando algo:
 * un grupo de botones con aria-pressed es más claro para lectores de
 * pantalla que un switch binario sin etiquetas visibles.
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
