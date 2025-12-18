/**
 * Angular Pattern and Geometric Variations
 * Sharp angular and geometric markings
 */

/**
 * Generate angular pattern - sharp angular markings
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for angular pattern
 */
export function angularPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { shapeCount = 3, shapeColor = secondary, opacity = 0.8 } = options;

  let shapes = "";

  for (let i = 0; i < shapeCount; i++) {
    const baseX = cx - rx * 0.4 + i * (rx * 0.35);
    const baseY = cy;
    const size = rx * 0.2 + (i % 2) * rx * 0.1;

    // Angular diamond shape
    shapes += `
      <path d="M${baseX} ${baseY - size}
               L${baseX + size * 0.7} ${baseY}
               L${baseX} ${baseY + size}
               L${baseX - size * 0.7} ${baseY}
               Z"
            fill="${shapeColor}" stroke="${accent}" stroke-width="1"
            opacity="${opacity}"/>
    `;
  }

  return shapes;
}

/**
 * Generate sail pattern - triangular sail-like dorsal marking
 */
export function sailPattern(colors, patternArea, options = {}) {
  const { secondary = "#4169E1", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { sailColor = secondary, opacity = 0.8 } = options;

  const sailBaseX = cx - rx * 0.3;
  const sailTipX = cx + rx * 0.2;
  const sailBaseY = cy - ry * 0.3;
  const sailTopY = cy - ry * 0.9;

  return `
    <path d="M${sailBaseX} ${sailBaseY}
             L${sailTipX} ${sailBaseY}
             L${cx} ${sailTopY}
             Z"
          fill="${sailColor}" stroke="${accent}" stroke-width="1"
          opacity="${opacity}"/>
  `;
}

/**
 * Generate pyramid pattern - pyramid/triangle arrangements
 */
export function pyramidPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFD700", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { pyramidCount = 3, pyramidColor = secondary, opacity = 0.8 } = options;

  let pyramids = "";

  for (let i = 0; i < pyramidCount; i++) {
    const baseX = cx - rx * 0.5 + i * (rx * 0.4);
    const baseY = cy + ry * 0.2;
    const tipY = cy - ry * 0.3 - (i % 2) * ry * 0.1;
    const width = rx * 0.15;

    pyramids += `
      <path d="M${baseX - width} ${baseY}
               L${baseX} ${tipY}
               L${baseX + width} ${baseY}
               Z"
            fill="${pyramidColor}" stroke="${accent}" stroke-width="0.5"
            opacity="${opacity}"/>
    `;
  }

  return pyramids;
}

/**
 * Generate crosshatch pattern - grid of crossed lines
 */
export function crosshatchPattern(colors, patternArea, options = {}) {
  const { secondary = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { lineCount = 4, lineColor = secondary, opacity = 0.4 } = options;

  let lines = "";
  const spacing = (rx * 1.4) / lineCount;

  // Diagonal lines in one direction
  for (let i = 0; i < lineCount; i++) {
    const startX = cx - rx * 0.7 + i * spacing;
    const startY = cy - ry * 0.7;
    const endX = startX + rx * 0.5;
    const endY = cy + ry * 0.7;

    lines += `
      <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
            stroke="${lineColor}" stroke-width="1" opacity="${opacity}"/>
    `;
  }

  // Diagonal lines in opposite direction
  for (let i = 0; i < lineCount; i++) {
    const startX = cx - rx * 0.7 + i * spacing;
    const startY = cy + ry * 0.7;
    const endX = startX + rx * 0.5;
    const endY = cy - ry * 0.7;

    lines += `
      <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
            stroke="${lineColor}" stroke-width="1" opacity="${opacity}"/>
    `;
  }

  return lines;
}

/**
 * Generate incomplete-bands pattern - partial/broken bands
 */
export function incompleteBandsPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { bandCount = 2, bandColor = secondary, opacity = 0.8 } = options;

  let bands = "";
  const spacing = (rx * 2) / (bandCount + 1);

  for (let i = 1; i <= bandCount; i++) {
    const x = cx - rx + spacing * i;
    const gapStart = cy - ry * 0.2;
    const gapEnd = cy + ry * 0.2;

    // Top portion
    bands += `
      <path d="M${x} ${cy - ry + 3} L${x} ${gapStart}" 
            stroke="${accent}" stroke-width="5" fill="none" opacity="${opacity}"/>
      <path d="M${x} ${cy - ry + 3} L${x} ${gapStart}" 
            stroke="${bandColor}" stroke-width="3" fill="none" opacity="${opacity}"/>
    `;

    // Bottom portion
    bands += `
      <path d="M${x} ${gapEnd} L${x} ${cy + ry - 3}" 
            stroke="${accent}" stroke-width="5" fill="none" opacity="${opacity}"/>
      <path d="M${x} ${gapEnd} L${x} ${cy + ry - 3}" 
            stroke="${bandColor}" stroke-width="3" fill="none" opacity="${opacity}"/>
    `;
  }

  return bands;
}

/**
 * Generate marked pattern - general small body markings
 */
export function markedPattern(colors, patternArea, options = {}) {
  const { secondary = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { markCount = 8, markColor = secondary, opacity = 0.6 } = options;

  let marks = "";

  for (let i = 0; i < markCount; i++) {
    const angle = (i / markCount) * Math.PI * 2 + i * 0.7;
    const radiusFactor = 0.25 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 0.45;

    const markX = cx + Math.cos(angle) * rx * radiusFactor;
    const markY = cy + Math.sin(angle) * ry * radiusFactor;
    const size = 2 + (i % 3);
    const rotation = i * 37;

    // Small dash marks
    marks += `
      <line x1="${markX - size}" y1="${markY}" x2="${markX + size}" y2="${markY}"
            stroke="${markColor}" stroke-width="1.5" opacity="${opacity}"
            transform="rotate(${rotation} ${markX} ${markY})"/>
    `;
  }

  return marks;
}
