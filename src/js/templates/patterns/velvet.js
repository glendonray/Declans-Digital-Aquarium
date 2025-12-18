/**
 * Velvet Pattern and Solid Variations
 * Subtle variations on solid coloring with texture effects
 */

import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate velvet pattern - solid with subtle soft texture
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function velvetPattern(colors, patternArea, options = {}) {
  const { primary = "#1F2937" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { opacity = 0.25 } = options;

  const id = generateId("velvet");
  const lightColor = lighten(primary, 10);
  const darkColor = darken(primary, 10);

  // Create subtle gradient for velvet-like texture
  const defs = `
    <radialGradient id="${id}-velvet" cx="30%" cy="30%">
      <stop offset="0%" style="stop-color:${lightColor};stop-opacity:${opacity}"/>
      <stop offset="50%" style="stop-color:${primary};stop-opacity:0"/>
      <stop offset="100%" style="stop-color:${darkColor};stop-opacity:${opacity * 0.5}"/>
    </radialGradient>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 2}" ry="${ry - 2}" 
             fill="url(#${id}-velvet)"/>
  `;

  return { defs, elements };
}

/**
 * Generate nearly-solid pattern - very subtle color variation
 */
export function nearlySolidPattern(colors, patternArea, options = {}) {
  const { primary = "#333333" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { opacity = 0.15 } = options;

  const id = generateId("nearly-solid");
  const variation = lighten(primary, 5);

  // Very subtle linear gradient
  const defs = `
    <linearGradient id="${id}-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${variation};stop-opacity:${opacity}"/>
      <stop offset="100%" style="stop-color:${primary};stop-opacity:0"/>
    </linearGradient>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 2}" ry="${ry - 2}" 
             fill="url(#${id}-subtle)"/>
  `;

  return { defs, elements };
}

/**
 * Generate mostly-white pattern - predominantly white overlay
 */
export function mostlyWhitePattern(colors, patternArea, options = {}) {
  const { cx, cy, rx, ry } = patternArea;
  const { opacity = 0.6 } = options;

  const id = generateId("mostly-white");

  // White overlay with slight fade at edges
  const defs = `
    <radialGradient id="${id}-white">
      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:${opacity}"/>
      <stop offset="70%" style="stop-color:#FFFFFF;stop-opacity:${opacity * 0.8}"/>
      <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:${opacity * 0.3}"/>
    </radialGradient>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 2}" ry="${ry - 2}" 
             fill="url(#${id}-white)"/>
  `;

  return { defs, elements };
}
