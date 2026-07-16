import FadeUp from "../common/FadeUp";
import { COLORS, FONT_DISPLAY } from "../../constants/colors";

export default function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="relative px-6 py-24 md:py-32"
      style={{ background: COLORS.creamSoft }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.15fr] gap-14 md:gap-20 items-center">
        <FadeUp>
          <span
            className="uppercase text-xs tracking-[0.25em] font-medium"
            style={{ color: COLORS.turquoiseDeep }}
          >
            Quiénes somos
          </span>
          <h2
            className="text-3xl md:text-[2.7rem] leading-[1.15] mt-4"
            style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
          >
            Dos fuerzas, <br /> un mismo estudio.
          </h2>
        </FadeUp>

        <FadeUp
          className="space-y-6 text-[15px] md:text-base leading-relaxed"
          style={{ color: COLORS.pine, opacity: 0.88 }}
        >
          <p>
            <strong
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: "1.125rem",
                color: COLORS.gold,
              }}
            >
              Mística
            </strong>{" "}
            es lo que pasa antes del código: la intuición que lee a tu
            audiencia, la lectura certera de lo que tu marca necesita decir sin
            decirlo. Es la mirada que conecta, que va más allá de lo evidente.
          </p>
          <p>
            <strong
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: "1.125rem",
                color: COLORS.pine,
              }}
            >
              Web Studio
            </strong>{" "}
            es la estructura que sostiene esa intuición: orden, procesos claros
            y la capacidad técnica de construir universos visuales completos,
            desde el logo hasta la última línea de código.
          </p>
          <p>
            Ninguna marca se transforma solo con estética ni solo con
            estrategia. Nosotras trabajamos en ese punto exacto donde ambas se
            encuentran — y ahí es donde tu negocio empieza a verse como
            realmente es.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
