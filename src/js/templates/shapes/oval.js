/**
 * Oval Shape Template
 * Standard fish body shape - used by clownfish, goldfish, betta, etc.
 */

import { createEye } from "../components/eye.js";
import { createMouth } from "../components/mouth.js";
import { createBlush } from "../components/blush.js";
import {
  createDorsalFin,
  createPectoralFin,
  createTailFin,
} from "../components/fins.js";
import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate an oval-shaped fish body
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} options - Shape options
 * @returns {Object} SVG shape data with all elements
 */
export function ovalShape(colors, options = {}) {
  const {
    primary = "#FF6B35",
    secondary = "#FFFFFF",
    accent = "#000000",
  } = colors;
  const id = options.id || generateId("oval");

  const lightPrimary = lighten(primary, 15);
  const darkPrimary = darken(primary, 15);

  return {
    viewBox: "0 0 100 60",
    width: 100,
    height: 60,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${lightPrimary}"/>
        <stop offset="100%" style="stop-color:${primary}"/>
      </linearGradient>
      <linearGradient id="${id}-belly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${secondary}"/>
        <stop offset="100%" style="stop-color:${lighten(secondary, 10)}"/>
      </linearGradient>
    `,

    tail: createTailFin(18, 30, {
      fill: `url(#${id}-body)`,
      stroke: darkPrimary,
      style: "forked",
      size: 12,
    }),

    body: `
      <!-- Main body ellipse -->
      <ellipse cx="50" cy="30" rx="35" ry="22" fill="url(#${id}-body)"/>
      <!-- Belly highlight -->
      <ellipse cx="55" cy="38" rx="20" ry="10" fill="url(#${id}-belly)" opacity="0.4"/>
    `,

    fins:
      createDorsalFin(35, 10, {
        fill: `url(#${id}-body)`,
        stroke: darkPrimary,
        style: "rounded",
        width: 20,
        height: 8,
      }) +
      createPectoralFin(60, 38, {
        fill: `url(#${id}-body)`,
        stroke: darkPrimary,
        rx: 10,
        ry: 5,
      }),

    face:
      createEye(70, 27, { size: "medium", color: accent }) +
      createMouth(82, 32, { style: "smile", color: darkPrimary }) +
      createBlush(72, 40, { baseColor: primary, size: "medium" }),

    // Pattern area for overlays
    patternArea: {
      cx: 50,
      cy: 30,
      rx: 35,
      ry: 22,
    },
  };
}
