/**
 * Flame Pattern
 * Flame-like upward curving shapes
 */

import { lighten, generateId } from "../utils/color.js";

/**
 * Generate flame pattern - flame-like shapes
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function flamePattern(colors, patternArea, options = {}) {
  const { primary = "#FF4500", secondary = "#FFD700", accent = "#FF6B35" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { flameCount = 4, opacity = 0.8 } = options;

  const id = generateId("flame");

  // Create flame gradient
  const defs = `
    <linearGradient id="${id}-flame" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:${primary};stop-opacity:${opacity}"/>
      <stop offset="50%" style="stop-color:${accent};stop-opacity:${opacity * 0.8}"/>
      <stop offset="100%" style="stop-color:${secondary};stop-opacity:${opacity * 0.6}"/>
    </linearGradient>
  `;

  let flames = "";

  for (let i = 0; i < flameCount; i++) {
    const baseX = cx - rx * 0.5 + i * (rx * 0.35);
    const baseY = cy + ry * 0.3;
    const tipY = cy - ry * 0.4 - (i % 2) * ry * 0.2;
    const width = rx * 0.15 + (i % 2) * rx * 0.05;

    // Flame shape using bezier curves
    flames += `
      <path d="M${baseX - width} ${baseY}
               Q${baseX - width * 0.5} ${cy} ${baseX} ${tipY}
               Q${baseX + width * 0.5} ${cy} ${baseX + width} ${baseY}
               Q${baseX} ${baseY + ry * 0.1} ${baseX - width} ${baseY}
               Z"
            fill="url(#${id}-flame)" opacity="${opacity}"/>
    `;
  }

  return { defs, elements: flames };
}
