/**
 * Lined Pattern
 * Fine parallel lines (thinner and more numerous than stripes)
 */

/**
 * Generate lined pattern overlay - fine parallel lines
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for line pattern
 */
export function linedPattern(colors, patternArea, options = {}) {
  const { secondary = "#4169E1", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    lineCount = 8,
    lineWidth = 1,
    lineColor = secondary,
    horizontal = false, // true for horizontal lines, false for vertical
    opacity = 0.7,
  } = options;

  let lines = "";

  if (horizontal) {
    const spacing = (ry * 2) / (lineCount + 1);
    for (let i = 1; i <= lineCount; i++) {
      const y = cy - ry + spacing * i;
      lines += `
        <path d="M${cx - rx + 3} ${y} Q${cx} ${y + 1} ${cx + rx - 3} ${y}" 
              stroke="${lineColor}" stroke-width="${lineWidth}" 
              fill="none" opacity="${opacity}"/>
      `;
    }
  } else {
    const spacing = (rx * 2) / (lineCount + 1);
    for (let i = 1; i <= lineCount; i++) {
      const x = cx - rx + spacing * i;
      lines += `
        <path d="M${x} ${cy - ry + 3} Q${x + 1} ${cy} ${x} ${cy + ry - 3}" 
              stroke="${lineColor}" stroke-width="${lineWidth}" 
              fill="none" opacity="${opacity}"/>
      `;
    }
  }

  return lines;
}
