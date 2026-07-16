import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../constants/navigation";

export default function Footer() {
  return (
    <footer
      className="px-6 pt-16 pb-10"
      style={{ background: COLORS.pineDeep, color: COLORS.cream }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 md:gap-8">
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
          <p className="text-sm opacity-70 max-w-xs leading-relaxed">
            Estrategia con alma. Diseño de marca, web y piezas físicas para
            negocios que quieren verse como realmente son.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">
            Navegación
          </h4>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mws-link opacity-85 hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">
            Redes
          </h4>
          <ul className="space-y-2.5 text-sm">
            {SOCIAL_LINKS.map((red) => (
              <li key={red}>
                <a href="#" className="mws-link opacity-85 hover:opacity-100">
                  {red}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">
            Contacto
          </h4>
          <ul className="space-y-2.5 text-sm opacity-85">
            <li>hola@misticawebstudio.com</li>
            <li>+52 55 0000 0000</li>
            <li>Ciudad de México, México</li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-14 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-xs opacity-55"
        style={{ borderColor: "rgba(247,234,214,0.15)" }}
      >
        <span>© 2026 Mística Web Studio. Todos los derechos reservados.</span>
        <span>La magia de ver, la ciencia de ejecutar.</span>
      </div>
    </footer>
  );
}
