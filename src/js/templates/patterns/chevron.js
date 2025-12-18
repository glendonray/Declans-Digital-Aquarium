/**
 * Chevron Pattern
 * V-shaped stripes pointing toward tail or head
 */

/**
 * Generate chevron pattern overlay - V-shaped stripes
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for chevron pattern
 */
export function chevronPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    chevronCount = 3,
    chevronWidth = 2.5,
    chevronColor = secondary,
    withBorder = true,
    borderColor = accent,
    pointsLeft = true, // V points toward tail (left) if true
    opacity = 0.8,
  } = options;

  let chevrons = "";
  const spacing = (rx * 1.5) / (chevronCount + 1);
  const direction = pointsLeft ? 1 : -1;

  for (let i = 1; i <= chevronCount; i++) {
    const baseX = cx - rx * 0.5 + spacing * i;
    const tipX = baseX - direction * rx * 0.15;
    const topY = cy - ry * 0.7;
    const bottomY = cy + ry * 0.7;

    // Border
    if (withBorder) {
      chevrons += `
        <path d="M${baseX} ${topY} L${tipX} ${cy} L${baseX} ${bottomY}" 
              stroke="${borderColor}" stroke-width="${chevronWidth + 1.5}" 
              fill="none" stroke-linejoin="round" opacity="${opacity}"/>
      `;
    }

    // Main chevron
    chevrons += `
      <path d="M${baseX} ${topY} L${tipX} ${cy} L${baseX} ${bottomY}" 
            stroke="${chevronColor}" stroke-width="${chevronWidth}" 
            fill="none" stroke-linejoin="round" opacity="${opacity}"/>
    `;
  }

  return chevrons;
}
