/**
 * Gradient Pattern
 * Color gradient overlay (already built into base shapes, this adds extra)
 */

import { lighten, generateId } from "../utils/color.js";

/**
 * Generate gradient pattern overlay
 * @param {Object} colors - Color scheme
 * @param {Object} patternArea - Area to apply pattern
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for gradient overlay
 */
export function gradientPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { direction = "vertical", opacity = 0.3 } = options;

  const id = generateId("gradient-pattern");

  // Add a subtle shimmer/highlight gradient
  const gradientDef =
    direction === "vertical"
      ? `<linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0%" style="stop-color:${secondary};stop-opacity:${opacity}"/>
         <stop offset="50%" style="stop-color:${secondary};stop-opacity:0"/>
         <stop offset="100%" style="stop-color:${secondary};stop-opacity:${
          opacity * 0.5
        }"/>
       </linearGradient>`
      : `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
         <stop offset="0%" style="stop-color:${secondary};stop-opacity:${opacity}"/>
         <stop offset="50%" style="stop-color:${secondary};stop-opacity:0"/>
         <stop offset="100%" style="stop-color:${secondary};stop-opacity:${
          opacity * 0.5
        }"/>
       </linearGradient>`;

  return {
    defs: gradientDef,
    elements: `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 2}" ry="${
      ry - 2
    }" fill="url(#${id})"/>`,
  };
}
