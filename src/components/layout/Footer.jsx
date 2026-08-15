import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { FOOTER_LINKS } from "../../constants/navigation";
import { useLanguage } from "../../context/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="px-6 pt-16 pb-10"
      style={{ background: COLORS.pineDeep, color: COLORS.cream }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-8 lg:justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-4">
            <span
              className="text-xl"
              style={{ fontFamily: FONT_DISPLAY, color: COLORS.cream }}
            >
              Mística
            </span>
            <span
              className="text-xl -ml-1"
              style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoise }}
            >
              Web
            </span>
            <span
              className="text-xl -ml-1"
              style={{ fontFamily: FONT_SCRIPT, color: COLORS.goldLight }}
            >
              Studio
            </span>
          </div>
          <p className="text-base opacity-70 max-w-xs leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">
              {t.footer.navHeading}
            </h2>
            <nav aria-label={t.footer.navHeading}>
              <ul className="space-y-2.5 text-base">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="mws-link opacity-85 hover:opacity-100"
                    >
                      {t.nav[link.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">
              {t.footer.contactHeading}
            </h2>
            <ul className="space-y-2.5 text-base opacity-85">
              <li>
                <a className="mws-link" href="mailto:misticawebstudio@gmail.com">
                  misticawebstudio@gmail.com
                </a>
              </li>
              <li>
                <a className="mws-link" href="tel:+525528529983">
                  +52 55 285 29983
                </a>
              </li>
              <li>
                <a className="mws-link" href="tel:+529935907670">
                  +52 99 359 07670
                </a>
              </li>
              <li>{t.footer.addressLine}</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-14 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-sm opacity-70"
        style={{ borderColor: "rgba(247,234,214,0.15)" }}
      >
        <span>{t.footer.rights}</span>
        <span>{t.footer.motto}</span>
      </div>
    </footer>
  );
}
