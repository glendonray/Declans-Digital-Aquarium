/**
 * Streamlined Shape Template
 * Torpedo/shark-like body - used by whale shark, tuna, sharks
 */

import { createEye } from "../components/eye.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate a streamlined-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function streamlinedShape(colors, options = {}) {
  const {
    primary = "#475569",
    secondary = "#FFFFFF",
    accent = "#1E293B",
  } = colors;
  const id = options.id || generateId("streamlined");

  const lightPrimary = lighten(primary, 10);
  const darkPrimary = darken(primary, 15);

  return {
    viewBox: "0 0 140 60",
    width: 140,
    height: 60,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="100%" style="stop-color:${primary}"/>
      </linearGradient>
    `,

    tail: `
      <!-- Tail fin (vertical like sharks) -->
      <path d="M5 30 Q0 15 8 10 Q10 22 12 30 Q10 38 8 50 Q0 45 5 30" 
            fill="url(#${id}-body)"/>
    `,

    body: `
      <!-- Second dorsal fin -->
      <path d="M35 22 Q40 18 45 22" fill="url(#${id}-body)"/>
      
      <!-- First dorsal fin (larger) -->
      <path d="M65 18 Q75 5 85 18 Q78 20 70 20 Z" fill="url(#${id}-body)"/>
      
      <!-- Pectoral fins (large, wing-like) -->
      <path d="M80 35 Q60 50 55 55 Q70 48 80 40" fill="url(#${id}-body)"/>
      <path d="M80 35 Q95 55 100 52 Q90 42 80 38" fill="url(#${id}-body)" opacity="0.7"/>
      
      <!-- Main body - wide, streamlined -->
      <path d="M12 30 Q20 18 60 15 Q100 12 130 25 Q135 30 130 35 Q100 48 60 45 Q20 42 12 30" 
            fill="url(#${id}-body)"/>
      
      <!-- White belly -->
      <path d="M20 35 Q60 42 120 35 Q100 45 60 43 Q30 42 20 35" 
            fill="${secondary}" opacity="0.5"/>
      
      <!-- Horizontal lines/ridges -->
      <path d="M20 28 Q70 25 115 28" stroke="${darkPrimary}" stroke-width="0.5" fill="none"/>
      <path d="M25 33 Q70 31 110 33" stroke="${darkPrimary}" stroke-width="0.5" fill="none"/>
      
      <!-- Characteristic white spots pattern -->
      <circle cx="25" cy="25" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="35" cy="22" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="32" cy="30" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="45" cy="20" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="42" cy="28" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="55" cy="24" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="55" cy="32" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="65" cy="22" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="65" cy="28" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="75" cy="20" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="75" cy="30" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="85" cy="24" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="88" cy="28" r="2" fill="${secondary}" opacity="0.8"/>
      <circle cx="95" cy="26" r="1.5" fill="${secondary}" opacity="0.8"/>
      <circle cx="102" cy="28" r="1.5" fill="${secondary}" opacity="0.8"/>
    `,

    fins: "",

    face: `
      <!-- Wide mouth -->
      <path d="M125 28 Q135 25 135 30 Q135 35 125 32" fill="${accent}"/>
      
      <!-- Gill slits -->
      <line x1="115" y1="26" x2="115" y2="34" stroke="${accent}" stroke-width="1"/>
      <line x1="118" y1="25" x2="118" y2="35" stroke="${accent}" stroke-width="1"/>
      <line x1="121" y1="26" x2="121" y2="34" stroke="${accent}" stroke-width="1"/>
      
      <!-- Eye (small for body size) -->
      ${createEye(122, 28, { size: "small", color: accent })}
    `,

    // Pattern area for overlays
    patternArea: {
      cx: 70,
      cy: 30,
      rx: 55,
      ry: 18,
    },
  };
}
