/**
 * Banded Pattern
 * Wide vertical bands (like clownfish)
 */

import { darken } from "../utils/color.js";

/**
 * Generate banded pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for band pattern
 */
export function bandedPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    bandCount = 2,
    bandWidth = 4,
    bandColor = secondary,
    borderColor = accent,
    borderWidth = 2,
    opacity = 1,
  } = options;

  let bands = "";
  const spacing = (rx * 2) / (bandCount + 1);

  for (let i = 1; i <= bandCount; i++) {
    const x = cx - rx + spacing * i;

    // Black border first (wider)
    bands += `
      <path d="M${x} ${cy - ry + 3} Q${x + 2} ${cy} ${x} ${cy + ry - 3}" 
            stroke="${borderColor}" stroke-width="${bandWidth + borderWidth}" 
            fill="none" opacity="${opacity}"/>
    `;

    // White/colored band on top
    bands += `
      <path d="M${x} ${cy - ry + 3} Q${x + 2} ${cy} ${x} ${cy + ry - 3}" 
            stroke="${bandColor}" stroke-width="${bandWidth}" 
            fill="none" opacity="${opacity}"/>
    `;
  }

  return bands;
}
