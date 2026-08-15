export const COLORS = {
  cream: "#F7EAD6",
  creamSoft: "#F0DEC1",
  pine: "#123B37",
  pineDeep: "#0B2624",
  gold: "#BD8A34",
  goldLight: "#D8AE66",
  // Variante oscurecida de `gold` para usarse como texto/ícono sobre fondos
  // claros (cream/creamSoft). El `gold` original da ~2.6:1 de contraste
  // sobre cream (no cumple WCAG AA ni siquiera para texto grande);
  // `goldText` da ~4.6:1. Mantén `gold` para fondos oscuros y decoraciones.
  goldText: "#886325",
  turquoise: "#2E93A6",
  turquoiseDeep: "#22707F",
  // Color de estado de error (p. ej. formulario de contacto) sobre fondos
  // oscuros como `pine`. Contraste ~6:1 sobre pine, cumple WCAG AA.
  errorLight: "#F2A65A",
};

export const FONT_DISPLAY = "'Fraunces', serif";
export const FONT_SCRIPT = "'Caveat', cursive";
export const FONT_BODY = "'Inter', sans-serif";
