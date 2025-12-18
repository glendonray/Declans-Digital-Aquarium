/**
 * Spotted Pattern
 * Circular spots overlay
 */

import { generateId } from "../utils/color.js";

/**
 * Generate spotted pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for spot pattern
 */
export function spottedPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    spotCount = 8,
    spotColor = secondary,
    minSize = 1.5,
    maxSize = 3,
    opacity = 0.8,
  } = options;

  let spots = "";

  // Generate random-looking but deterministic spots
  for (let i = 0; i < spotCount; i++) {
    // Use sine/cosine for pseudo-random distribution
    const angle = (i / spotCount) * Math.PI * 2 + i * 0.7;
    const radiusFactor = 0.3 + (Math.sin(i * 2.3) * 0.5 + 0.5) * 0.5;

    const spotX = cx + Math.cos(angle) * rx * radiusFactor;
    const spotY = cy + Math.sin(angle) * ry * radiusFactor;
    const spotSize = minSize + ((i * 1.7) % 1) * (maxSize - minSize);

    spots += `
      <circle cx="${spotX.toFixed(1)}" cy="${spotY.toFixed(1)}" r="${spotSize}" 
              fill="${spotColor}" opacity="${opacity}"/>
    `;
  }

  return spots;
}
