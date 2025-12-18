/**
 * Scaled Pattern
 * Scale-like overlapping circles arranged in rows
 */

import { lighten, generateId } from "../utils/color.js";

/**
 * Generate scaled pattern overlay - fish scale appearance
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function scaledPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", primary = "#FF6B35" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { rows = 4, scalesPerRow = 6, scaleColor = lighten(primary, 15), opacity = 0.5 } = options;

  const id = generateId("scaled");
  let scales = "";

  const rowHeight = (ry * 1.6) / rows;
  const scaleWidth = (rx * 1.6) / scalesPerRow;
  const scaleRadius = Math.min(scaleWidth, rowHeight) * 0.6;

  for (let row = 0; row < rows; row++) {
    const rowY = cy - ry * 0.8 + row * rowHeight;
    const offset = row % 2 === 0 ? 0 : scaleWidth / 2;

    for (let col = 0; col < scalesPerRow; col++) {
      const scaleX = cx - rx * 0.8 + col * scaleWidth + offset;

      // Only draw if within the ellipse bounds
      const normalizedX = (scaleX - cx) / rx;
      const normalizedY = (rowY - cy) / ry;
      if (normalizedX * normalizedX + normalizedY * normalizedY < 0.85) {
        // Create arc for top of scale
        scales += `
          <path d="M${scaleX - scaleRadius} ${rowY} 
                   A${scaleRadius} ${scaleRadius * 0.8} 0 0 1 ${scaleX + scaleRadius} ${rowY}"
                stroke="${scaleColor}" stroke-width="1" fill="none" opacity="${opacity}"/>
        `;
      }
    }
  }

  return scales;
}

/**
 * Generate pearlscale pattern - pearl-like iridescent spots
 */
export function pearlscalePattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { pearlCount = 12, opacity = 0.6 } = options;

  const id = generateId("pearlscale");
  let pearls = "";

  // Create iridescent pearl gradient
  const defs = `
    <radialGradient id="${id}-pearl">
      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9"/>
      <stop offset="50%" style="stop-color:${secondary};stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:${secondary};stop-opacity:0.2"/>
    </radialGradient>
  `;

  for (let i = 0; i < pearlCount; i++) {
    const angle = (i / pearlCount) * Math.PI * 2 + i * 0.5;
    const radiusFactor = 0.25 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 0.45;

    const pearlX = cx + Math.cos(angle) * rx * radiusFactor;
    const pearlY = cy + Math.sin(angle) * ry * radiusFactor;
    const pearlSize = 2 + (i % 3);

    pearls += `
      <circle cx="${pearlX.toFixed(1)}" cy="${pearlY.toFixed(1)}" r="${pearlSize}" 
              fill="url(#${id}-pearl)" opacity="${opacity}"/>
    `;
  }

  return { defs, elements: pearls };
}

/**
 * Generate teardrop pattern - teardrop-shaped spots
 */
export function teardropPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { dropCount = 6, dropColor = secondary, opacity = 0.8 } = options;

  let drops = "";

  for (let i = 0; i < dropCount; i++) {
    const angle = (i / dropCount) * Math.PI * 2 + i * 0.8;
    const radiusFactor = 0.3 + (Math.sin(i * 2.7) * 0.5 + 0.5) * 0.4;

    const dropX = cx + Math.cos(angle) * rx * radiusFactor;
    const dropY = cy + Math.sin(angle) * ry * radiusFactor;
    const dropSize = 2 + (i % 2);
    const rotation = (angle * 180) / Math.PI + 90;

    // Teardrop shape using path
    drops += `
      <path d="M${dropX} ${dropY - dropSize * 1.5} 
               Q${dropX + dropSize} ${dropY - dropSize * 0.5} ${dropX + dropSize * 0.7} ${dropY + dropSize * 0.5}
               Q${dropX} ${dropY + dropSize} ${dropX - dropSize * 0.7} ${dropY + dropSize * 0.5}
               Q${dropX - dropSize} ${dropY - dropSize * 0.5} ${dropX} ${dropY - dropSize * 1.5}
               Z"
            fill="${dropColor}" opacity="${opacity}"
            transform="rotate(${rotation} ${dropX} ${dropY})"/>
    `;
  }

  return drops;
}
