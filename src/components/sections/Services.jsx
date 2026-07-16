import FadeUp from "../common/FadeUp";
import ServiceCard from "./ServiceCard";
import { COLORS, FONT_DISPLAY } from "../../constants/colors";
import { SERVICES } from "../../constants/services";

export default function Servicios() {
  return (
    <section id="servicios" className="px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="uppercase text-xs tracking-[0.25em] font-medium"
            style={{ color: COLORS.turquoiseDeep }}
          >
            Qué hacemos
          </span>
          <h2
            className="text-3xl md:text-[2.6rem] leading-[1.15] mt-4"
            style={{ fontFamily: FONT_DISPLAY, color: COLORS.pine }}
          >
            Un mismo criterio, de la idea al código
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
