/**
 * Marbled Pattern and Chaotic Variations
 * Organic, marble-like swirled patterns
 */

import { lighten, darken, generateId } from "../utils/color.js";

/**
 * Generate marbled pattern - organic marble-like swirls
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for marbled pattern
 */
export function marbledPattern(colors, patternArea, options = {}) {
  const { primary = "#333333", secondary = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { swirls = 4, opacity = 0.6 } = options;

  let marble = "";
  const swirlColors = [secondary, lighten(primary, 30), secondary];

  for (let i = 0; i < swirls; i++) {
    const startAngle = (i / swirls) * Math.PI * 2;
    const color = swirlColors[i % swirlColors.length];

    // Organic curved path
    const startX = cx - rx * 0.6 + i * (rx * 0.35);
    const startY = cy - ry * 0.5 + Math.sin(i) * ry * 0.3;
    const endX = startX + rx * 0.4 + Math.cos(i * 2) * rx * 0.2;
    const endY = cy + ry * 0.4 + Math.sin(i * 1.5) * ry * 0.2;

    const ctrl1X = startX + rx * 0.5 + Math.sin(i * 3) * rx * 0.2;
    const ctrl1Y = startY + ry * 0.4;
    const ctrl2X = endX - rx * 0.3 + Math.cos(i * 2) * rx * 0.15;
    const ctrl2Y = endY - ry * 0.3;

    marble += `
      <path d="M${startX} ${startY} C${ctrl1X} ${ctrl1Y} ${ctrl2X} ${ctrl2Y} ${endX} ${endY}" 
            stroke="${color}" stroke-width="${2 + (i % 2)}" fill="none" 
            opacity="${opacity}" stroke-linecap="round"/>
    `;
  }

  return marble;
}

/**
 * Generate stormy pattern - chaotic dark patches
 */
export function stormyPattern(colors, patternArea, options = {}) {
  const { primary = "#333333", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { patchCount = 6, opacity = 0.5 } = options;

  let storm = "";
  const stormColor = darken(primary, 20);

  for (let i = 0; i < patchCount; i++) {
    const angle = (i / patchCount) * Math.PI * 2 + i * 1.4;
    const radiusFactor = 0.2 + (Math.sin(i * 2.7) * 0.5 + 0.5) * 0.5;

    const patchX = cx + Math.cos(angle) * rx * radiusFactor;
    const patchY = cy + Math.sin(angle) * ry * radiusFactor;
    const patchRx = 5 + (i % 3) * 3;
    const patchRy = 4 + ((i + 1) % 3) * 2;
    const rotation = i * 41;

    storm += `
      <ellipse cx="${patchX.toFixed(1)}" cy="${patchY.toFixed(1)}" 
               rx="${patchRx}" ry="${patchRy}" 
               fill="${stormColor}" opacity="${opacity}"
               transform="rotate(${rotation} ${patchX.toFixed(1)} ${patchY.toFixed(1)})"/>
    `;
  }

  return storm;
}

/**
 * Generate flurry pattern - many small random marks
 */
export function flurryPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { flakeCount = 20, opacity = 0.7 } = options;

  let flurry = "";

  for (let i = 0; i < flakeCount; i++) {
    const angle = (i / flakeCount) * Math.PI * 2 + i * 2.3;
    const radiusFactor = 0.1 + (Math.sin(i * 1.9) * 0.5 + 0.5) * 0.7;

    const flakeX = cx + Math.cos(angle) * rx * radiusFactor;
    const flakeY = cy + Math.sin(angle) * ry * radiusFactor;
    const size = 1 + (i % 3) * 0.5;

    flurry += `
      <circle cx="${flakeX.toFixed(1)}" cy="${flakeY.toFixed(1)}" r="${size}" 
              fill="${secondary}" opacity="${opacity}"/>
    `;
  }

  return flurry;
}

/**
 * Generate scribbled pattern - random curved lines
 */
export function scribbledPattern(colors, patternArea, options = {}) {
  const { secondary = "#4169E1", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { lineCount = 5, opacity = 0.6 } = options;

  let scribbles = "";

  for (let i = 0; i < lineCount; i++) {
    const startX = cx - rx * 0.7 + i * (rx * 0.3);
    const startY = cy - ry * 0.5 + Math.sin(i * 2) * ry * 0.3;

    // Create random-looking bezier curve
    let path = `M${startX} ${startY}`;
    const segments = 3 + (i % 2);

    for (let j = 0; j < segments; j++) {
      const nextX = startX + (j + 1) * (rx * 0.2) + Math.sin(j * 3 + i) * rx * 0.1;
      const nextY = startY + Math.sin(j * 2 + i) * ry * 0.4;
      const ctrlX = (startX + nextX) / 2 + Math.cos(j * 4 + i) * rx * 0.15;
      const ctrlY = (startY + nextY) / 2 + Math.sin(j * 3 + i) * ry * 0.2;

      path += ` Q${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;
    }

    scribbles += `
      <path d="${path}" 
            stroke="${i % 2 === 0 ? secondary : accent}" stroke-width="1.5" 
            fill="none" opacity="${opacity}" stroke-linecap="round"/>
    `;
  }

  return scribbles;
}
