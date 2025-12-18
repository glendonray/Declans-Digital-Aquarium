/**
 * Swirled Pattern
 * Psychedelic wavy patterns (like mandarin dragonet)
 */

import { lighten, generateId } from "../utils/color.js";

/**
 * Generate swirled pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function swirledPattern(colors, patternArea, options = {}) {
  const {
    primary = "#F97316",
    secondary = "#3B82F6",
    accent = "#22C55E",
  } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { swirlCount = 4, strokeWidth = 2, opacity = 0.7 } = options;

  let swirls = "";
  const swirlColors = [secondary, accent, lighten(secondary, 20)];

  for (let i = 0; i < swirlCount; i++) {
    const startAngle = (i / swirlCount) * Math.PI * 2;
    const color = swirlColors[i % swirlColors.length];

    // Create wavy bezier curves
    const startX = cx - rx * 0.8 + i * (rx * 0.4);
    const startY = cy - ry * 0.6;
    const endX = startX + rx * 0.3;
    const endY = cy + ry * 0.6;

    const ctrl1X = startX + rx * 0.4;
    const ctrl1Y = startY + ry * 0.3;
    const ctrl2X = startX - rx * 0.2;
    const ctrl2Y = endY - ry * 0.3;

    swirls += `
      <path d="M${startX} ${startY} C${ctrl1X} ${ctrl1Y} ${ctrl2X} ${ctrl2Y} ${endX} ${endY}" 
            stroke="${color}" stroke-width="${strokeWidth}" fill="none" 
            opacity="${opacity}" stroke-linecap="round"/>
    `;

    // Add a parallel offset swirl
    if (i < swirlCount - 1) {
      swirls += `
        <path d="M${startX + 5} ${startY + 3} C${ctrl1X + 3} ${ctrl1Y + 5} ${
        ctrl2X + 5
      } ${ctrl2Y - 3} ${endX + 3} ${endY - 5}" 
              stroke="${lighten(color, 15)}" stroke-width="${
        strokeWidth * 0.7
      }" fill="none" 
              opacity="${opacity * 0.6}" stroke-linecap="round"/>
      `;
    }
  }

  return swirls;
}
