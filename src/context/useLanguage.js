import { useContext } from "react";
import { LanguageContext } from "./languageContextObject";

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return ctx;
}
