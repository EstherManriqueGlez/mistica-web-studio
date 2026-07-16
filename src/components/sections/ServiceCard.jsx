import { COLORS, FONT_DISPLAY } from "../../constants/colors";

/**
 * Tarjeta individual de servicio. Recibe los datos de un item
 * del array SERVICES (constants/services.js) como props.
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
        className="text-sm leading-relaxed space-y-1.5"
        style={{ color: COLORS.pine, opacity: 0.8 }}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
