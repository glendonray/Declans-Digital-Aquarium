/**
 * Barred Pattern
 * Horizontal bars (like striped but rotated 90 degrees)
 */

import { darken } from "../utils/color.js";

/**
 * Generate barred pattern overlay - horizontal bars
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for bar pattern
 */
export function barredPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { barCount = 4, barWidth = 2, barColor = secondary, withBorder = true, borderColor = accent, opacity = 0.8 } = options;

  let bars = "";
  const spacing = (ry * 2) / (barCount + 1);

  for (let i = 1; i <= barCount; i++) {
    const y = cy - ry + spacing * i;

    // Optional border for contrast
    if (withBorder) {
      bars += `
        <path d="M${cx - rx + 5} ${y} Q${cx} ${y + 2} ${cx + rx - 5} ${y}" 
              stroke="${borderColor}" stroke-width="${barWidth + 1.5}" 
              fill="none" opacity="${opacity}"/>
      `;
    }

    // Main bar
    bars += `
      <path d="M${cx - rx + 5} ${y} Q${cx} ${y + 2} ${cx + rx - 5} ${y}" 
            stroke="${barColor}" stroke-width="${barWidth}" 
            fill="none" opacity="${opacity}"/>
    `;
  }

  return bars;
}
