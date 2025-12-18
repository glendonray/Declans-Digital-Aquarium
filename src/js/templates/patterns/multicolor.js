/**
 * Multicolor Pattern
 * Multiple distinct color zones across the body
 */

import { generateId } from "../utils/color.js";

/**
 * Generate multicolor pattern - multiple color zones
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function multicolorPattern(colors, patternArea, options = {}) {
  const { primary = "#FF6B35", secondary = "#4169E1", accent = "#22C55E" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { opacity = 0.7 } = options;

  const id = generateId("multicolor");

  // Create zones of different colors
  const defs = `
    <linearGradient id="${id}-multi" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${primary};stop-opacity:0"/>
      <stop offset="25%" style="stop-color:${secondary};stop-opacity:${opacity}"/>
      <stop offset="50%" style="stop-color:${accent};stop-opacity:${opacity}"/>
      <stop offset="75%" style="stop-color:${secondary};stop-opacity:${opacity}"/>
      <stop offset="100%" style="stop-color:${primary};stop-opacity:0"/>
    </linearGradient>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 2}" ry="${ry - 2}" 
             fill="url(#${id}-multi)"/>
  `;

  return { defs, elements };
}
