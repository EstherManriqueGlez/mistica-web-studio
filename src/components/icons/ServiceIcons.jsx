/**
 * Íconos de línea usados en las tarjetas de Servicios.
 * Cada uno solo devuelve el contenido interno (paths/circles);
 * el <svg> que los envuelve vive en ServiceCard.jsx.
 */

export function DesignWebIcon() {
  return (
    <>
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 5.5l1.5-1.5a1.6 1.6 0 0 1 2.3 0l1.7 1.7a1.6 1.6 0 0 1 0 2.3l-1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </>
  );
}

export function DevWebIcon() {
  return (
    <path
      d="M8 8L3 12l5 4M16 8l5 4-5 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function AccessibilityIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="8" r="1.4" fill="currentColor" />
      <path
        d="M6.5 10.5c3.6 1.4 7.4 1.4 11 0M12 10v4.5M9.5 19l2-4.5 2 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

export function SeoIcon() {
  return (
    <>
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15.5 15.5L21 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  );
}

export function InfraIcon() {
  return (
    <>
      <rect
        x="3"
        y="4"
        width="18"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3"
        y="14"
        width="18"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" />
    </>
  );
}
