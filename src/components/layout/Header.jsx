import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { NAV_LINKS } from "../../constants/navigation";

export default function Header() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 mws-nav-blur"
      style={{ borderBottom: "1px solid rgba(18,59,55,0.1)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span
            className="text-2xl md:text-[26px] tracking-tight"
            style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
          >
            Mística
          </span>
          <span
            className="text-2xl md:text-[28px] -ml-1"
            style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoiseDeep }}
          >
            Web
          </span>
          <span
            className="text-2xl md:text-[28px] -ml-1"
            style={{ fontFamily: FONT_SCRIPT, color: COLORS.pine }}
          >
            Studio
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="mws-link">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="mws-btn-primary hidden md:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium"
          style={{ background: COLORS.pine, color: COLORS.cream }}
        >
          Agenda tu sesión
        </a>

        <a
          href="#contacto"
          className="mws-btn-primary md:hidden inline-flex items-center rounded-full px-4 py-2 text-xs font-medium"
          style={{ background: COLORS.pine, color: COLORS.cream }}
        >
          Agendar
        </a>
      </div>
    </header>
  );
}
