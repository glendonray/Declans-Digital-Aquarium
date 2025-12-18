/**
 * Unusual Shape Template
 * Unique fish shapes - seahorse, pipefish, etc.
 */

import { createEye } from "../components/eye.js";
import { createBlush } from "../components/blush.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate an unusual-shaped fish body (seahorse style)
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function unusualShape(colors, options = {}) {
  const {
    primary = "#FBBF24",
    secondary = "#FDE68A",
    accent = "#1E293B",
  } = colors;
  const id = options.id || generateId("unusual");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 20);

  return {
    viewBox: "0 0 60 100",
    width: 60,
    height: 100,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${primary}"/>
        <stop offset="100%" style="stop-color:${lightPrimary}"/>
      </linearGradient>
    `,

    tail: `
      <!-- Curled tail -->
      <path d="M25 85 Q15 90 18 95 Q25 98 28 92 Q30 88 28 85" 
            fill="none" stroke="url(#${id}-body)" stroke-width="5" stroke-linecap="round"/>
    `,

    body: `
      <!-- Body - curved S shape with segments -->
      <path d="M30 75 Q35 65 32 55 Q28 45 32 35 Q38 25 35 18" 
            fill="none" stroke="url(#${id}-body)" stroke-width="12" stroke-linecap="round"/>
      
      <!-- Belly (lighter) -->
      <path d="M32 70 Q38 60 35 50 Q32 42 35 35" 
            fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round"/>
      
      <!-- Segment ridges -->
      <path d="M24 72 L36 72" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      <path d="M23 65 L37 65" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      <path d="M24 58 L36 58" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      <path d="M25 51 L35 51" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      <path d="M26 44 L34 44" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      <path d="M27 37 L35 37" stroke="${darkPrimary}" stroke-width="1" opacity="0.5"/>
      
      <!-- Head -->
      <ellipse cx="35" cy="15" rx="10" ry="12" fill="url(#${id}-body)"/>
      
      <!-- Snout -->
      <path d="M42 18 Q55 20 50 22 Q45 23 42 22" fill="url(#${id}-body)"/>
      
      <!-- Crown/coronet -->
      <path d="M30 5 Q35 2 38 5 Q40 8 35 10 Q30 8 30 5" fill="${lightPrimary}"/>
    `,

    fins: `
      <!-- Dorsal fin -->
      <path d="M22 55 Q15 50 18 45 Q22 48 24 52" fill="${primary}" stroke="${darkPrimary}" stroke-width="0.5"/>
    `,

    face:
      createEye(38, 12, { size: "small", color: accent }) +
      createBlush(40, 18, { baseColor: primary, size: "small" }),

    // Pattern area for overlays (using body curve approximation)
    patternArea: {
      cx: 32,
      cy: 50,
      rx: 8,
      ry: 30,
    },
  };
}
