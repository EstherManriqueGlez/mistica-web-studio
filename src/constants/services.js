import { COLORS } from "./colors";
import {
  DesignWebIcon,
  DevWebIcon,
  AccessibilityIcon,
  SeoIcon,
  InfraIcon,
} from "../components/icons/ServiceIcons";

export const SERVICES = [
  {
    title: "Diseño Web",
    iconColor: COLORS.gold,
    Icon: DesignWebIcon,
    items: [
      "Visual design consulting",
      "Arquitectura del sitio (site architecture)",
    ],
  },
  {
    title: "Desarrollo Web",
    iconColor: COLORS.turquoise,
    Icon: DevWebIcon,
    items: [
      "Desarrollo responsive",
      "Aplicaciones web",
      "Integración y migración de CMS",
      "Integración con software de terceros",
      "Optimización de rendimiento",
      "Mantenimiento y soporte",
    ],
  },
  {
    title: "Accesibilidad Web",
    iconColor: COLORS.pine,
    Icon: AccessibilityIcon,
    items: [
      "Cumplimiento ADA y WCAG",
      "Compatibilidad con lectores de pantalla",
      "Cumplimiento en contenido interactivo",
      "Navegación por teclado",
    ],
  },
  {
    title: "SEO & Rendimiento",
    iconColor: COLORS.turquoiseDeep,
    Icon: SeoIcon,
    items: [
      "Optimización SEO",
      "Velocidad y rendimiento del sitio",
      "Implementación de schema",
      "Cumplimiento de cookies",
      "Certificados SSL",
      "Google Tag Manager",
    ],
  },
  {
    title: "Consultoría Técnica & Infraestructura",
    iconColor: COLORS.gold,
    Icon: InfraIcon,
    items: [
      "Selección de CMS y stack tecnológico",
      "Integraciones con software de terceros",
      "Requerimientos de servidor",
      "Seguridad",
      "Optimización de infraestructura",
      "Talleres y capacitación",
    ],
  },
];
