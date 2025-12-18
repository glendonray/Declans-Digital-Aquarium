/**
 * Disc Shape Template
 * Tall, round fish body - used by angelfish, discus, butterflyfish, moorish idol
 */

import { createEye } from "../components/eye.js";
import { createMouth } from "../components/mouth.js";
import { createBlush } from "../components/blush.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate a disc-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function discShape(colors, options = {}) {
  const {
    primary = "#EC4899",
    secondary = "#06B6D4",
    accent = "#000000",
  } = colors;
  const id = options.id || generateId("disc");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 20);

  return {
    viewBox: "0 0 90 90",
    width: 90,
    height: 90,

    defs: `
      <radialGradient id="${id}-body" cx="60%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="50%" style="stop-color:${primary}"/>
        <stop offset="100%" style="stop-color:${darkPrimary}"/>
      </radialGradient>
      <linearGradient id="${id}-stripe" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${secondary}"/>
        <stop offset="100%" style="stop-color:${lighten(secondary, 10)}"/>
      </linearGradient>
    `,

    tail: `
      <!-- Tail fin -->
      <path d="M15 45 Q5 35 8 30 Q12 40 15 45 Q12 50 8 60 Q5 55 15 45" 
            fill="url(#${id}-body)"/>
    `,

    body: `
      <!-- Dorsal fin -->
      <path d="M30 20 Q45 5 65 15 Q60 22 50 25 Q40 24 30 20" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
      
      <!-- Anal fin -->
      <path d="M30 70 Q45 85 65 75 Q60 68 50 65 Q40 66 30 70" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
      
      <!-- Main body - nearly perfect circle -->
      <circle cx="45" cy="45" r="30" fill="url(#${id}-body)"/>
      
      <!-- Belly highlight -->
      <ellipse cx="50" cy="55" rx="18" ry="12" fill="${secondary}" opacity="0.15"/>
    `,

    fins: `
      <!-- Pectoral fin -->
      <ellipse cx="58" cy="52" rx="9" ry="5" fill="url(#${id}-body)" opacity="0.8"/>
    `,

    face:
      createEye(62, 40, { size: "medium", color: accent }) +
      `<circle cx="62" cy="40" r="7" fill="none" stroke="${darken(
        primary,
        30
      )}" stroke-width="1.5"/>` +
      createMouth(72, 48, { style: "smile", color: darkPrimary }) +
      createBlush(65, 52, { baseColor: primary, size: "medium" }),

    // Pattern area for overlays
    patternArea: {
      cx: 45,
      cy: 45,
      rx: 30,
      ry: 30,
    },
  };
}
