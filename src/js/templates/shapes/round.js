/**
 * Round Shape Template
 * Spherical fish body with big eyes - used by pufferfish
 */

import { createEyePair } from "../components/eye.js";
import { createMouth } from "../components/mouth.js";
import { createBlushPair } from "../components/blush.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate a round-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function roundShape(colors, options = {}) {
  const {
    primary = "#FCD34D",
    secondary = "#FFFFFF",
    accent = "#4A4A4A",
  } = colors;
  const id = options.id || generateId("round");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 15);

  return {
    viewBox: "0 0 90 80",
    width: 90,
    height: 80,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="100%" style="stop-color:${primary}"/>
      </linearGradient>
      <radialGradient id="${id}-belly" cx="50%" cy="70%" r="50%">
        <stop offset="0%" style="stop-color:${secondary}"/>
        <stop offset="100%" style="stop-color:${lightPrimary}"/>
      </radialGradient>
    `,

    tail: `
      <!-- Small tail -->
      <ellipse cx="12" cy="40" rx="8" ry="10" fill="${primary}"/>
    `,

    body: `
      <!-- Main round body -->
      <circle cx="45" cy="40" r="32" fill="url(#${id}-body)"/>
      
      <!-- White belly -->
      <ellipse cx="50" cy="50" rx="20" ry="15" fill="url(#${id}-belly)"/>
      
      <!-- Speckles/spots -->
      <circle cx="30" cy="30" r="3" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="40" cy="22" r="2.5" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="55" cy="25" r="3" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="25" cy="45" r="2" fill="${darkPrimary}" opacity="0.3"/>
      <circle cx="65" cy="35" r="2.5" fill="${darkPrimary}" opacity="0.3"/>
    `,

    fins: `
      <!-- Dorsal fin -->
      <path d="M45 10 Q50 5 55 10" fill="${primary}" stroke="${darkPrimary}" stroke-width="1"/>
      
      <!-- Side fin -->
      <ellipse cx="75" cy="40" rx="8" ry="5" fill="${primary}" stroke="${darkPrimary}" stroke-width="1"/>
    `,

    face:
      // Big front-facing eyes
      createEyePair(35, 55, 32, { size: "large", color: accent }) +
      // Pouty mouth
      createMouth(70, 45, {
        style: "pouty",
        size: "medium",
        color: darkPrimary,
      }) +
      // Blush on both cheeks
      createBlushPair(40, 60, 50, { baseColor: primary, size: "medium" }),

    // Pattern area for overlays
    patternArea: {
      cx: 45,
      cy: 40,
      rx: 32,
      ry: 32,
    },
  };
}
