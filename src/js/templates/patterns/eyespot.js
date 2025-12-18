/**
 * Eyespot Pattern
 * Prominent eye spot marking (ocellus) - used to confuse predators
 */

import { generateId } from "../utils/color.js";

/**
 * Generate eyespot pattern - single large ocellus
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function eyespotPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    spotX = cx + rx * 0.2, // Position toward rear
    spotY = cy - ry * 0.1,
    spotSize = Math.min(rx, ry) * 0.35,
    ringColor = accent,
    innerColor = secondary,
    pupilColor = "#000000",
    opacity = 0.95,
  } = options;

  const id = generateId("eyespot");

  // Create gradient for realistic eye effect
  const defs = `
    <radialGradient id="${id}-iris">
      <stop offset="0%" style="stop-color:${innerColor};stop-opacity:1"/>
      <stop offset="70%" style="stop-color:${innerColor};stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${ringColor};stop-opacity:0.8"/>
    </radialGradient>
  `;

  const elements = `
    <!-- Outer ring -->
    <circle cx="${spotX}" cy="${spotY}" r="${spotSize}" 
            fill="${ringColor}" opacity="${opacity}"/>
    <!-- Inner ring -->
    <circle cx="${spotX}" cy="${spotY}" r="${spotSize * 0.75}" 
            fill="url(#${id}-iris)" opacity="${opacity}"/>
    <!-- Pupil -->
    <circle cx="${spotX}" cy="${spotY}" r="${spotSize * 0.3}" 
            fill="${pupilColor}" opacity="${opacity}"/>
    <!-- Highlight -->
    <circle cx="${spotX - spotSize * 0.15}" cy="${spotY - spotSize * 0.15}" r="${spotSize * 0.12}" 
            fill="#FFFFFF" opacity="0.8"/>
  `;

  return { defs, elements };
}

/**
 * Generate target pattern - concentric circles
 */
export function targetPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { targetX = cx, targetY = cy, rings = 3, maxSize = Math.min(rx, ry) * 0.4, opacity = 0.85 } = options;

  let circles = "";
  const colors_arr = [accent, secondary, accent, secondary];

  for (let i = 0; i < rings; i++) {
    const ringSize = maxSize * (1 - i / rings);
    const ringColor = colors_arr[i % colors_arr.length];

    circles += `
      <circle cx="${targetX}" cy="${targetY}" r="${ringSize}" 
              fill="${ringColor}" opacity="${opacity}"/>
    `;
  }

  return circles;
}

/**
 * Generate mimic pattern - mimics an eye spot, alias for eyespot
 */
export function mimicPattern(colors, patternArea, options = {}) {
  // Mimic pattern typically shows a false eye to confuse predators
  return eyespotPattern(colors, patternArea, {
    ...options,
    spotX: patternArea.cx - patternArea.rx * 0.3, // Position toward tail
    spotY: patternArea.cy,
  });
}
