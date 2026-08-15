import { createContext } from "react";

// Plain context object, no components, in its own file: this lets
// LanguageContext.jsx (the Provider) and useLanguage.js (the hook)
// each keep exporting only a component / only a hook, which is what
// Vite's Fast Refresh rule requires.
export const LanguageContext = createContext(null);
