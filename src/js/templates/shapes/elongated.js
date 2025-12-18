/**
 * Elongated Shape Template
 * Long, snake-like fish body - used by eels, loaches, catfish, arowana
 */

import { createEye } from "../components/eye.js";
import { createMouth } from "../components/mouth.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate an elongated-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function elongatedShape(colors, options = {}) {
  const {
    primary = "#F97316",
    secondary = "#FBBF24",
    accent = "#1E293B",
  } = colors;
  const id = options.id || generateId("elongated");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 20);

  return {
    viewBox: "0 0 160 45",
    width: 160,
    height: 45,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="50%" style="stop-color:${primary}"/>
        <stop offset="100%" style="stop-color:${darkPrimary}"/>
      </linearGradient>
      <linearGradient id="${id}-belly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${secondary}"/>
        <stop offset="100%" style="stop-color:${lighten(secondary, 10)}"/>
      </linearGradient>
    `,

    tail: `
      <!-- Rounded tail fin -->
      <path d="M8 22 Q2 15 5 10 Q8 18 10 22 Q8 26 5 35 Q2 30 8 22" 
            fill="url(#${id}-body)" stroke="${darkPrimary}" stroke-width="0.5"/>
    `,

    body: `
      <!-- Main elongated body with slight S-curve -->
      <path d="M10 22 
               Q30 18 50 20 
               Q70 22 90 20 
               Q110 18 130 22 
               Q145 24 150 22
               Q145 28 130 26
               Q110 30 90 28
               Q70 26 50 28
               Q30 30 10 26
               Z" 
            fill="url(#${id}-body)"/>
      
      <!-- Belly highlight -->
      <path d="M15 25 Q50 28 90 27 Q130 26 145 25 Q130 28 90 29 Q50 30 15 27 Z" 
            fill="url(#${id}-belly)" opacity="0.4"/>
      
      <!-- Continuous dorsal fin ridge -->
      <path d="M20 18 Q40 14 60 16 Q80 14 100 16 Q120 14 140 18" 
            fill="none" stroke="url(#${id}-body)" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Body segment lines (eel-like) -->
      <path d="M25 19 L25 29" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M40 18 L40 30" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M55 19 L55 29" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M70 18 L70 30" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M85 19 L85 29" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M100 18 L100 30" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M115 19 L115 29" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      <path d="M130 20 L130 28" stroke="${darkPrimary}" stroke-width="0.5" opacity="0.3"/>
      
      <!-- Lateral line -->
      <path d="M20 23 Q70 22 120 23 Q140 24 148 23" 
            stroke="${darkPrimary}" stroke-width="0.5" fill="none" opacity="0.4"/>
    `,

    fins: `
      <!-- Small pectoral fin -->
      <ellipse cx="135" cy="26" rx="6" ry="4" fill="url(#${id}-body)" 
               stroke="${darkPrimary}" stroke-width="0.5" opacity="0.8"/>
    `,

    face:
      // Eye
      createEye(145, 20, { size: "small", color: accent }) +
      // Mouth
      createMouth(155, 24, { style: "small", color: darkPrimary }) +
      // Whiskers/barbels (common in catfish, loaches)
      `<path d="M152 22 Q158 20 160 18" stroke="${darkPrimary}" stroke-width="0.5" fill="none"/>
       <path d="M152 24 Q158 24 162 22" stroke="${darkPrimary}" stroke-width="0.5" fill="none"/>`,

    // Pattern area for overlays
    patternArea: {
      cx: 80,
      cy: 23,
      rx: 70,
      ry: 8,
    },
  };
}

