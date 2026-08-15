import { COLORS } from "./colors";
import {
  DesignWebIcon,
  DevWebIcon,
  AccessibilityIcon,
  SeoIcon,
  InfraIcon,
} from "../components/icons/ServiceIcons";

/**
 * Metadatos visuales de cada tarjeta de servicio (icono y color).
 * El título y la lista de puntos viven en las traducciones
 * (src/i18n/translations.js -> services.items) y se combinan con este
 * array por índice en Services.jsx, ya que el texto depende del idioma.
 */
export const SERVICE_ICONS = [
  { iconColor: COLORS.goldText, Icon: DesignWebIcon },
  { iconColor: COLORS.turquoiseDeep, Icon: DevWebIcon },
  { iconColor: COLORS.pine, Icon: AccessibilityIcon },
  { iconColor: COLORS.turquoiseDeep, Icon: SeoIcon },
  { iconColor: COLORS.goldText, Icon: InfraIcon },
];
