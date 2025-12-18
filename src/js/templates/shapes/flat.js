/**
 * Flat Shape Template
 * Wide, flattened fish body - used by rays, stingrays, and plecos
 */

import { createEye } from "../components/eye.js";
import { createMouth } from "../components/mouth.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate a flat-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function flatShape(colors, options = {}) {
  const { primary = "#64748B", secondary = "#FFFFFF", accent = "#1E293B" } = colors;
  const id = options.id || generateId("flat");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 20);

  return {
    viewBox: "0 0 120 70",
    width: 120,
    height: 70,

    defs: `
      <radialGradient id="${id}-body" cx="50%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="70%" style="stop-color:${primary}"/>
        <stop offset="100%" style="stop-color:${darkPrimary}"/>
      </radialGradient>
      <linearGradient id="${id}-belly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${secondary}"/>
        <stop offset="100%" style="stop-color:${lighten(secondary, 5)}"/>
      </linearGradient>
    `,

    tail: `
      <!-- Whip-like tail -->
      <path d="M10 35 Q0 35 -5 38 Q0 40 10 35" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
      <!-- Tail base -->
      <ellipse cx="15" cy="35" rx="8" ry="6" fill="url(#${id}-body)"/>
    `,

    body: `
      <!-- Main flattened diamond body -->
      <path d="M25 35 
               Q40 10 60 8 
               Q80 10 95 35 
               Q80 60 60 62 
               Q40 60 25 35" 
            fill="url(#${id}-body)"/>
      
      <!-- Wing-like pectoral fins -->
      <path d="M45 25 Q30 15 20 20 Q25 30 45 35" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
      <path d="M45 45 Q30 55 20 50 Q25 40 45 35" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
      
      <!-- Belly/underside highlight -->
      <ellipse cx="60" cy="40" rx="25" ry="15" fill="url(#${id}-belly)" opacity="0.3"/>
      
      <!-- Body texture lines -->
      <path d="M35 30 Q50 28 70 30" stroke="${darkPrimary}" stroke-width="0.5" fill="none" opacity="0.4"/>
      <path d="M35 40 Q50 42 70 40" stroke="${darkPrimary}" stroke-width="0.5" fill="none" opacity="0.4"/>
      
      <!-- Spots/markings -->
      <circle cx="50" cy="30" r="2" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="65" cy="28" r="1.5" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="55" cy="38" r="2" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="70" cy="35" r="1.5" fill="${darkPrimary}" opacity="0.3"/>
    `,

    fins: `
      <!-- Small dorsal ridge -->
      <path d="M55 15 Q60 12 65 15" fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
    `,

    face: createEye(85, 32, { size: "small", color: accent }) + createMouth(100, 38, { style: "small", color: darkPrimary }),

    // Pattern area for overlays
    patternArea: {
      cx: 60,
      cy: 35,
      rx: 35,
      ry: 25,
    },
  };
}
