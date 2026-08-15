/**
 * Nav links store a `key` (not the label text) because the visible
 * label depends on the active language (see src/i18n/translations.js
 * and src/context/LanguageContext.jsx).
 */
export const NAV_LINKS = [
  { href: "#quienes-somos", key: "about" },
  { href: "#servicios", key: "services" },
  { href: "#contacto", key: "contact" },
];

export const FOOTER_LINKS = [
  { href: "#inicio", key: "home" },
  { href: "#quienes-somos", key: "about" },
  { href: "#servicios", key: "services" },
  { href: "#contacto", key: "contact" },
];
