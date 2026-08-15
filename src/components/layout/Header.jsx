import { useState } from "react";
import { COLORS } from "../../constants/colors";
import { NAV_LINKS } from "../../constants/navigation";
import { useLanguage } from "../../context/useLanguage";
import LanguageSwitch from "../common/LanguageSwitch";
import logo from "../../assets/mistica-web-studio-logo.png";

export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 mws-nav-blur"
      style={{ borderBottom: "1px solid rgba(18,59,55,0.1)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Mística Web Studio"
            className="h-14 md:h-18 w-auto"
          />
        </a>

        <nav
          aria-label={t.nav.primaryLabel}
          className="hidden md:flex items-center gap-8 text-base tracking-wide"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="mws-link">
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitch />
          <a
            href="#contacto"
            className="mws-btn-primary inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium"
            style={{ background: COLORS.pine, color: COLORS.cream }}
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitch />
          <a
            href="#contacto"
            className="mws-btn-primary inline-flex items-center rounded-full px-4 py-2 text-xs font-medium"
            style={{ background: COLORS.pine, color: COLORS.cream }}
          >
            {t.nav.ctaShort}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex items-center justify-center rounded-full p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: COLORS.pine, outlineColor: COLORS.gold }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        hidden={!menuOpen}
        aria-label={t.nav.primaryLabel}
        className="md:hidden px-6 pb-6 flex flex-col gap-1 text-base"
        style={{ borderTop: "1px solid rgba(18,59,55,0.1)" }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="py-3 mws-link"
            style={{ color: COLORS.pine }}
          >
            {t.nav[link.key]}
          </a>
        ))}
      </nav>
    </header>
  );
}
