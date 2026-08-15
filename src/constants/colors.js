export const COLORS = {
  cream: "#F7EAD6",
  creamSoft: "#F0DEC1",
  pine: "#123B37",
  pineDeep: "#0B2624",
  gold: "#BD8A34",
  goldLight: "#D8AE66",
  // Darkened variant of `gold`, for text/icons on light backgrounds
  // (cream/creamSoft). Plain `gold` only reaches ~2.6:1 contrast on
  // cream (fails WCAG AA even for large text); `goldText` reaches ~4.6:1.
  // Keep `gold` for dark backgrounds and decoration.
  goldText: "#886325",
  turquoise: "#2E93A6",
  turquoiseDeep: "#22707F",
  // Light variant of `turquoise`, for text on very dark or variable
  // backgrounds (e.g. the Hero video scrim): plain `turquoise` drops to
  // ~2.7:1 in the worst case (a light video frame), `turquoiseLight`
  // holds ~4.6:1+.
  turquoiseLight: "#60C0D3",
  // Error-state color (e.g. the contact form) on dark backgrounds like
  // `pine`. ~6:1 contrast on pine, meets WCAG AA.
  errorLight: "#F2A65A",
};

export const FONT_DISPLAY = "'Fraunces', serif";
export const FONT_SCRIPT = "'Caveat', cursive";
export const FONT_BODY = "'Inter', sans-serif";
