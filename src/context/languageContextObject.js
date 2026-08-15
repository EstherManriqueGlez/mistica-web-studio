import { createContext } from "react";

// Objeto de contexto puro, sin componentes, en su propio archivo:
// así LanguageContext.jsx (el Provider) y useLanguage.js (el hook)
// pueden seguir exportando solo un componente / solo un hook cada uno,
// que es lo que exige la regla de Fast Refresh de Vite.
export const LanguageContext = createContext(null);
