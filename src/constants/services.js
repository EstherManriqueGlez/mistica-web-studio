import { COLORS } from "./colors";
import {
  DesignWebIcon,
  DevWebIcon,
  AccessibilityIcon,
  SeoIcon,
  InfraIcon,
} from "../components/icons/ServiceIcons";

/**
 * Visual metadata for each service card (icon and color).
 * The title and bullet list live in translations
 * (src/i18n/translations.js -> services.items) and get merged with this
 * array by index in Services.jsx, since the text is language-dependent.
 *
 * Cards are static (soft cream background, see ServiceCard.jsx), so each
 * icon only needs one color, chosen for contrast on that light surface.
 */
export const SERVICE_ICONS = [
  { iconColor: COLORS.goldText, Icon: DesignWebIcon },
  { iconColor: COLORS.turquoiseDeep, Icon: DevWebIcon },
  { iconColor: COLORS.pine, Icon: AccessibilityIcon },
  { iconColor: COLORS.turquoiseDeep, Icon: SeoIcon },
  { iconColor: COLORS.goldText, Icon: InfraIcon },
];
