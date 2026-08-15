import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  translations,
} from "../i18n/translations";
import { LanguageContext } from "./languageContextObject";

const STORAGE_KEY = "mws-lang";

function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.includes(stored)) return stored;
  } catch {
    // localStorage puede no estar disponible (modo privado, etc.)
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Provee el idioma activo (por defecto inglés) y las traducciones a toda
 * la app. Sincroniza <html lang>, el <title> y la meta description para
 * que el cambio de idioma también sea correcto de cara a SEO/accesibilidad.
 * El hook de consumo (useLanguage) vive en ./useLanguage.js para que este
 * archivo solo exporte el componente Provider (requisito de Fast Refresh).
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignorar si no hay storage disponible
    }

    document.title = t.meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", t.meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) ogDescription.setAttribute("content", t.meta.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", lang === "es" ? "es_MX" : "en_US");
    }
  }, [lang, t]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((prev) => (prev === "en" ? "es" : "en")),
      t,
    }),
    [lang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
