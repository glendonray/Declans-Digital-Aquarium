/**
 * Ringed Pattern
 * Circular ring markings on the body
 */

/**
 * Generate ringed pattern - circular ring markings
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for ringed pattern
 */
export function ringedPattern(colors, patternArea, options = {}) {
  const { secondary = "#4169E1", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { ringCount = 3, ringColor = secondary, ringWidth = 2, withBorder = true, borderColor = accent, opacity = 0.8 } = options;

  let rings = "";

  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2 + i * 0.8;
    const radiusFactor = 0.25 + (Math.sin(i * 2.5) * 0.5 + 0.5) * 0.4;

    const ringX = cx + Math.cos(angle) * rx * radiusFactor;
    const ringY = cy + Math.sin(angle) * ry * radiusFactor;
    const ringRadius = 4 + (i % 2) * 2;

    // Border ring
    if (withBorder) {
      rings += `
        <circle cx="${ringX.toFixed(1)}" cy="${ringY.toFixed(1)}" r="${ringRadius}" 
                fill="none" stroke="${borderColor}" stroke-width="${ringWidth + 1}"
                opacity="${opacity}"/>
      `;
    }

    // Main ring
    rings += `
      <circle cx="${ringX.toFixed(1)}" cy="${ringY.toFixed(1)}" r="${ringRadius}" 
              fill="none" stroke="${ringColor}" stroke-width="${ringWidth}"
              opacity="${opacity}"/>
    `;
  }

  return rings;
}

/**
 * Generate filaments pattern - thin extending lines
 */
export function filamentsPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#FFD700" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { filamentCount = 6, opacity = 0.7 } = options;

  let filaments = "";

  for (let i = 0; i < filamentCount; i++) {
    const angle = (i / filamentCount) * Math.PI + Math.PI / 4; // Mostly on top/bottom
    const startX = cx + Math.cos(angle) * rx * 0.6;
    const startY = cy + Math.sin(angle) * ry * 0.6;
    const length = ry * 0.4 + (i % 3) * ry * 0.15;
    const endX = startX + Math.cos(angle) * length * 0.3;
    const endY = startY + Math.sin(angle) * length;

    const color = i % 2 === 0 ? secondary : accent;

    filaments += `
      <path d="M${startX} ${startY} Q${(startX + endX) / 2 + 3} ${(startY + endY) / 2} ${endX} ${endY}"
            stroke="${color}" stroke-width="1.5" fill="none" 
            opacity="${opacity}" stroke-linecap="round"/>
    `;
  }

  return filaments;
}
