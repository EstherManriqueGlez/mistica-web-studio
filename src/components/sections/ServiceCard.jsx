import { COLORS, FONT_DISPLAY } from "../../constants/colors";

/**
 * Tarjeta individual de servicio. `title`/`items` vienen de la traducción
 * activa (src/i18n/translations.js -> services.items) e `iconColor`/`Icon`
 * de SERVICE_ICONS (constants/services.js); Services.jsx combina ambos
 * por índice antes de pasarlos aquí como props.
 */
export default function ServiceCard({ title, iconColor, Icon, items }) {
  return (
    <div
      className="mws-card rounded-2xl p-8 md:p-9 border"
      style={{ background: COLORS.cream, borderColor: "rgba(18,59,55,0.12)" }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ color: iconColor }}
      >
        <Icon />
      </svg>
      <h3
        className="text-xl mt-5 mb-2"
        style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
      >
        {title}
      </h3>
      <ul
        className="text-base leading-relaxed space-y-1.5"
        style={{ color: COLORS.pine, opacity: 0.8 }}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
