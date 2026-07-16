import Sparkle from "../common/Sparkle";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-36 px-6"
    >
      <Sparkle
        className="absolute top-28 right-[8%] w-10 h-10 md:w-14 md:h-14"
        size={56}
        color={COLORS.gold}
      />
      <Sparkle
        className="absolute top-[52%] left-[6%] w-6 h-6 md:w-8 md:h-8"
        size={32}
        color={COLORS.turquoise}
        delay={1.4}
      />
      <Sparkle
        className="absolute bottom-16 right-[18%] w-5 h-5"
        size={20}
        color={COLORS.pine}
        delay={0.6}
      />

      {/* hilo místico, un guiño al trazo de la M del logo */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="mws-thread"
          d="M -50 620 C 150 500, 220 300, 340 160 C 400 90, 460 90, 500 200 C 540 320, 560 480, 620 380 C 680 280, 700 80, 780 60 C 900 30, 1050 140, 1260 90"
          stroke={COLORS.gold}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <div className="relative max-w-4xl mx-auto text-center">
        <p
          className="text-2xl md:text-3xl mb-4"
          style={{ fontFamily: FONT_SCRIPT, color: COLORS.turquoiseDeep }}
        >
          Somos estrategia con alma
        </p>

        <h1
          className="text-[2.6rem] leading-[1.08] md:text-7xl md:leading-[1.05] font-medium tracking-tight"
          style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
        >
          Transformamos tu marca
          <br className="hidden md:block" />
          en <span style={{ color: COLORS.gold }}>un universo</span> que vende
        </h1>

        <p
          className="mt-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: COLORS.pine, opacity: 0.82 }}
        >
          La magia de ver, la ciencia de ejecutar. Diseño de marca, sitios web
          de alta conversión y piezas físicas que hacen que tu negocio se
          sienta, por fin, completamente tuyo.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contacto"
            className="mws-btn-primary rounded-full px-9 py-4 font-medium text-[15px] tracking-wide"
            style={{ background: COLORS.pine, color: COLORS.cream }}
          >
            Quiero mi diagnóstico de marca
          </a>

          <a
            href="#servicios"
            className="mws-btn-ghost rounded-full px-9 py-4 font-medium text-[15px] tracking-wide"
            style={{ border: `1.5px solid ${COLORS.pine}`, color: COLORS.pine }}
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
