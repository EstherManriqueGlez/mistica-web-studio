import { useState } from "react";
import FadeUp from "../common/FadeUp";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";

export default function Contacto() {
  const [formStatus, setFormStatus] = useState("idle"); // idle | sent

  function handleSubmit(e) {
    e.preventDefault();
    setFormStatus("sent");
    e.target.reset();
  }

  return (
    <section
      id="contacto"
      className="px-6 py-24 md:py-28"
      style={{ background: COLORS.pine, color: COLORS.cream }}
    >
      <FadeUp className="max-w-2xl mx-auto text-center">
        <span
          className="text-2xl md:text-3xl"
          style={{ fontFamily: FONT_SCRIPT, color: COLORS.goldLight }}
        >
          Empecemos algo con alma
        </span>
        <h2
          className="text-3xl md:text-[2.5rem] leading-[1.15] mt-4"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          Agenda tu sesión de consultoría
        </h2>
        <p className="mt-5 text-sm md:text-base opacity-80 max-w-md mx-auto">
          Cuéntanos sobre tu negocio y te ayudamos a encontrar el punto exacto
          donde tu estrategia y tu estética se conectan.
        </p>

        <form
          className="mt-10 text-left grid gap-4 max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Tu nombre"
              className="mws-input w-full rounded-lg px-4 py-3 text-sm bg-transparent border focus:outline-none"
              style={{
                borderColor: "rgba(247,234,214,0.35)",
                color: COLORS.cream,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="correo"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              Correo
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              className="mws-input w-full rounded-lg px-4 py-3 text-sm bg-transparent border focus:outline-none"
              style={{
                borderColor: "rgba(247,234,214,0.35)",
                color: COLORS.cream,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="mensaje"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              Cuéntanos de tu proyecto
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={3}
              placeholder="¿Qué necesita tu marca?"
              className="mws-input w-full rounded-lg px-4 py-3 text-sm bg-transparent border focus:outline-none resize-none"
              style={{
                borderColor: "rgba(247,234,214,0.35)",
                color: COLORS.cream,
              }}
            />
          </div>
          <button
            type="submit"
            className="mws-submit mt-2 rounded-full px-8 py-4 font-medium text-[15px] tracking-wide"
            style={{ background: COLORS.gold, color: COLORS.pineDeep }}
          >
            Enviar y agendar sesión
          </button>
          {formStatus === "sent" && (
            <p className="text-sm" style={{ color: COLORS.goldLight }}>
              ¡Gracias! Te contactaremos muy pronto.
            </p>
          )}
        </form>
      </FadeUp>
    </section>
  );
}
