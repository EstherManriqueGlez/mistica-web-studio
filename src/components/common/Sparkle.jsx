import { COLORS } from "../../constants/colors";

/**
 * Destello decorativo de 4 puntas usado en el Hero.
 */
export default function Sparkle({
  className = "",
  size = 24,
  color = COLORS.gold,
  delay = 0,
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ animation: `mws-twinkle 3.2s ease-in-out ${delay}s infinite` }}
    >
      <path
        d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z"
        fill={color}
      />
    </svg>
  );
}
