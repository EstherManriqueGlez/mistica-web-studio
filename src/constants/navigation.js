/**
 * Los enlaces de navegación guardan una `key` (no el texto) porque la
 * etiqueta visible depende del idioma activo (ver src/i18n/translations.js
 * y src/context/LanguageContext.jsx).
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
