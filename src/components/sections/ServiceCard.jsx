import { COLORS, FONT_DISPLAY } from "../../constants/colors";

/**
 * Individual service card. `title`/`items` come from the active
 * translation (src/i18n/translations.js -> services.items), and
 * `iconColor`/`Icon` from SERVICE_ICONS (constants/services.js);
 * Services.jsx merges both by index before passing them down here as
 * props.
 *
 * No hover effects, by design, and no border: the card itself stays a
 * static, always-accessible soft cream surface. The curtain-style color
 * reveal now lives on the section background instead (see Services.jsx)
 * — the cards just sit on top of it.
 */
export default function ServiceCard({ title, iconColor, Icon, items }) {
  return (
    <div
      className="mws-card relative h-full overflow-hidden rounded-2xl"
      style={{ background: COLORS.creamSoft }}
    >
      <div className="relative h-full flex flex-col p-8 md:p-9">
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
    </div>
  );
}
