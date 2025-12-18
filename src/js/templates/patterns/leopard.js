/**
 * Leopard Pattern
 * Large irregular spots like a leopard's markings
 */

import { darken } from "../utils/color.js";

/**
 * Generate leopard pattern overlay - large irregular spots
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for leopard pattern
 */
export function leopardPattern(colors, patternArea, options = {}) {
  const { secondary = "#8B4513", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { spotCount = 7, spotColor = secondary, borderColor = accent, borderWidth = 1.5, opacity = 0.85 } = options;

  let spots = "";

  // Generate irregular rosette-like spots
  for (let i = 0; i < spotCount; i++) {
    const angle = (i / spotCount) * Math.PI * 2 + i * 1.3;
    const radiusFactor = 0.2 + (Math.sin(i * 2.9) * 0.5 + 0.5) * 0.5;

    const spotX = cx + Math.cos(angle) * rx * radiusFactor;
    const spotY = cy + Math.sin(angle) * ry * radiusFactor;

    // Irregular shape using bezier curves
    const size = 4 + (i % 3) * 2;
    const irregularity = size * 0.3;

    // Create irregular polygon points
    const points = [];
    const numPoints = 5 + (i % 3);
    for (let j = 0; j < numPoints; j++) {
      const pointAngle = (j / numPoints) * Math.PI * 2;
      const pointRadius = size + Math.sin(j * 2.3 + i) * irregularity;
      points.push({
        x: spotX + Math.cos(pointAngle) * pointRadius,
        y: spotY + Math.sin(pointAngle) * pointRadius * 0.8,
      });
    }

    // Build path from points
    let pathD = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let j = 1; j < points.length; j++) {
      const prev = points[j - 1];
      const curr = points[j];
      const ctrlX = (prev.x + curr.x) / 2 + (Math.sin(j * 1.7) * irregularity) / 2;
      const ctrlY = (prev.y + curr.y) / 2 + (Math.cos(j * 1.7) * irregularity) / 2;
      pathD += ` Q${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }
    pathD += " Z";

    // Border first
    spots += `
      <path d="${pathD}" 
            fill="none" stroke="${borderColor}" stroke-width="${borderWidth}"
            opacity="${opacity}"/>
    `;

    // Fill
    spots += `
      <path d="${pathD}" 
            fill="${spotColor}" opacity="${opacity * 0.7}"/>
    `;
  }

  return spots;
}
