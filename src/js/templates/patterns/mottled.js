/**
 * Mottled Pattern
 * Irregular patches/blotches
 */

import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate mottled pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for mottled pattern
 */
export function mottledPattern(colors, patternArea, options = {}) {
  const { primary = "#1F2937", secondary = "#F97316" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { patchCount = 5, patchColor = secondary, opacity = 0.8 } = options;

  let patches = "";

  // Generate irregular blob-like patches
  for (let i = 0; i < patchCount; i++) {
    const angle = (i / patchCount) * Math.PI * 2 + i * 1.1;
    const radiusFactor = 0.2 + (Math.sin(i * 3.7) * 0.5 + 0.5) * 0.5;

    const patchX = cx + Math.cos(angle) * rx * radiusFactor;
    const patchY = cy + Math.sin(angle) * ry * radiusFactor;
    const patchRx = 4 + (i % 3) * 2;
    const patchRy = 3 + ((i + 1) % 3) * 1.5;
    const rotation = i * 37; // Pseudo-random rotation

    patches += `
      <ellipse cx="${patchX.toFixed(1)}" cy="${patchY.toFixed(1)}" 
               rx="${patchRx}" ry="${patchRy}" 
               fill="${patchColor}" opacity="${opacity}"
               transform="rotate(${rotation} ${patchX.toFixed(
      1
    )} ${patchY.toFixed(1)})"/>
    `;
  }

  return patches;
}
