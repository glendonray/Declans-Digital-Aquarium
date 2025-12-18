/**
 * Striped Pattern
 * Vertical stripes overlay
 */

import { darken } from "../utils/color.js";

/**
 * Generate striped pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for stripe pattern
 */
export function stripedPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    stripeCount = 3,
    stripeWidth = 2,
    stripeColor = secondary,
    withBorder = true,
    opacity = 0.8,
  } = options;

  let stripes = "";
  const spacing = (rx * 2) / (stripeCount + 1);

  for (let i = 1; i <= stripeCount; i++) {
    const x = cx - rx + spacing * i;

    // Optional black border for contrast
    if (withBorder) {
      stripes += `
        <path d="M${x} ${cy - ry + 5} Q${x + 3} ${cy} ${x} ${cy + ry - 5}" 
              stroke="${accent}" stroke-width="${
        stripeWidth + 1.5
      }" fill="none" opacity="${opacity}"/>
      `;
    }

    // Main stripe
    stripes += `
      <path d="M${x} ${cy - ry + 5} Q${x + 3} ${cy} ${x} ${cy + ry - 5}" 
            stroke="${stripeColor}" stroke-width="${stripeWidth}" fill="none" opacity="${opacity}"/>
    `;
  }

  return stripes;
}
