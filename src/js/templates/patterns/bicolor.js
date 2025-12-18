/**
 * Bicolor Pattern and Two-Tone Variants
 * Patterns that divide the fish body into distinct color regions
 */

import { darken, generateId } from "../utils/color.js";

/**
 * Generate bicolor pattern - two distinct color halves
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function bicolorPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const {
    splitPosition = 0.5, // Where to split (0-1, left to right)
    splitColor = secondary,
    opacity = 0.9,
  } = options;

  const id = generateId("bicolor");
  const splitX = cx - rx + rx * 2 * splitPosition;

  // Create a clip path for the split region
  const defs = `
    <clipPath id="${id}-clip">
      <rect x="${splitX}" y="${cy - ry}" width="${rx * 2}" height="${ry * 2}"/>
    </clipPath>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 1}" ry="${ry - 1}" 
             fill="${splitColor}" opacity="${opacity}" 
             clip-path="url(#${id}-clip)"/>
  `;

  return { defs, elements };
}

/**
 * Generate half-dark pattern - one half darker than the other
 */
export function halfDarkPattern(colors, patternArea, options = {}) {
  const { primary = "#333333" } = colors;
  const darkColor = darken(primary, 30);
  return bicolorPattern(colors, patternArea, {
    ...options,
    splitColor: darkColor,
    splitPosition: 0.5,
  });
}

/**
 * Generate capped pattern - dark coloring on top
 */
export function cappedPattern(colors, patternArea, options = {}) {
  const { accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { capColor = accent, capHeight = 0.35, opacity = 0.85 } = options;

  const id = generateId("capped");

  // Create an arc for the cap on top
  const capY = cy - ry * (1 - capHeight);

  const defs = `
    <clipPath id="${id}-clip">
      <rect x="${cx - rx}" y="${cy - ry}" width="${rx * 2}" height="${ry * capHeight * 2}"/>
    </clipPath>
  `;

  const elements = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 1}" ry="${ry - 1}" 
             fill="${capColor}" opacity="${opacity}" 
             clip-path="url(#${id}-clip)"/>
  `;

  return { defs, elements };
}

/**
 * Generate masked pattern - dark coloring around face/eyes area
 */
export function maskedPattern(colors, patternArea, options = {}) {
  const { accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { maskColor = accent, maskWidth = 0.4, maskHeight = 0.5, opacity = 0.85 } = options;

  // Mask is positioned on the front (right side) of the fish
  const maskCx = cx + rx * 0.4;
  const maskRx = rx * maskWidth;
  const maskRy = ry * maskHeight;

  return `
    <ellipse cx="${maskCx}" cy="${cy}" rx="${maskRx}" ry="${maskRy}" 
             fill="${maskColor}" opacity="${opacity}"/>
  `;
}

/**
 * Generate saddled pattern - dark saddle shape on back
 */
export function saddledPattern(colors, patternArea, options = {}) {
  const { accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { saddleColor = accent, opacity = 0.8 } = options;

  // Create saddle shape on top of the fish
  const saddleWidth = rx * 0.6;
  const startX = cx - saddleWidth / 2;
  const endX = cx + saddleWidth / 2;
  const topY = cy - ry * 0.8;
  const midY = cy - ry * 0.2;

  return `
    <path d="M${startX} ${topY} 
             Q${cx} ${midY} ${endX} ${topY}
             L${endX} ${cy - ry + 2}
             Q${cx} ${cy - ry + 5} ${startX} ${cy - ry + 2}
             Z" 
          fill="${saddleColor}" opacity="${opacity}"/>
  `;
}

/**
 * Generate girdled pattern - wide band around the middle
 */
export function girdledPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { girdleColor = secondary, girdleWidth = 0.3, borderColor = accent, borderWidth = 1.5, opacity = 0.9 } = options;

  const halfWidth = rx * girdleWidth;

  let elements = "";

  // Border
  elements += `
    <rect x="${cx - halfWidth - borderWidth}" y="${cy - ry + 3}" 
          width="${halfWidth * 2 + borderWidth * 2}" height="${ry * 2 - 6}" 
          fill="${borderColor}" opacity="${opacity}" rx="2"/>
  `;

  // Main girdle
  elements += `
    <rect x="${cx - halfWidth}" y="${cy - ry + 3}" 
          width="${halfWidth * 2}" height="${ry * 2 - 6}" 
          fill="${girdleColor}" opacity="${opacity}" rx="1"/>
  `;

  return elements;
}

/**
 * Generate keyhole pattern - keyhole-shaped marking
 */
export function keyholePattern(colors, patternArea, options = {}) {
  const { accent = "#000000" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { keyholeColor = accent, opacity = 0.85 } = options;

  // Keyhole positioned on upper back area
  const keyCx = cx - rx * 0.1;
  const keyCy = cy - ry * 0.2;
  const keyRadius = ry * 0.25;

  // Circle on top, narrow slot below
  return `
    <circle cx="${keyCx}" cy="${keyCy}" r="${keyRadius}" 
            fill="${keyholeColor}" opacity="${opacity}"/>
    <path d="M${keyCx - keyRadius * 0.4} ${keyCy + keyRadius * 0.5}
             L${keyCx - keyRadius * 0.25} ${keyCy + keyRadius * 2}
             L${keyCx + keyRadius * 0.25} ${keyCy + keyRadius * 2}
             L${keyCx + keyRadius * 0.4} ${keyCy + keyRadius * 0.5}
             Z"
          fill="${keyholeColor}" opacity="${opacity}"/>
  `;
}
