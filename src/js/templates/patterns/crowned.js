/**
 * Crowned Pattern
 * Crown-like pattern on the head/top of fish
 */

import { lighten, generateId } from "../utils/color.js";

/**
 * Generate crowned pattern - crown-like head marking
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {Object} SVG elements with defs and elements
 */
export function crownedPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFD700", accent = "#4169E1" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { crownColor = secondary, opacity = 0.85 } = options;

  const id = generateId("crowned");

  // Crown gradient for royal effect
  const defs = `
    <linearGradient id="${id}-crown" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:${opacity}"/>
      <stop offset="100%" style="stop-color:${crownColor};stop-opacity:${opacity}"/>
    </linearGradient>
  `;

  // Crown shape on top of head
  const crownBaseY = cy - ry * 0.5;
  const crownTopY = cy - ry * 0.9;
  const crownWidth = rx * 0.6;
  const points = 5;

  let crownPath = `M${cx - crownWidth} ${crownBaseY}`;

  for (let i = 0; i <= points; i++) {
    const x = cx - crownWidth + (i / points) * crownWidth * 2;
    const y = i % 2 === 0 ? crownBaseY : crownTopY;
    crownPath += ` L${x} ${y}`;
  }

  crownPath += ` L${cx + crownWidth} ${crownBaseY} Z`;

  const elements = `
    <path d="${crownPath}" fill="url(#${id}-crown)" opacity="${opacity}"/>
  `;

  return { defs, elements };
}

/**
 * Generate fanged pattern - fang-like pointed markings
 */
export function fangedPattern(colors, patternArea, options = {}) {
  const { accent = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { fangCount = 4, fangColor = accent, opacity = 0.85 } = options;

  let fangs = "";

  for (let i = 0; i < fangCount; i++) {
    const baseX = cx - rx * 0.4 + i * (rx * 0.25);
    const baseY = cy - ry * 0.3;
    const tipY = cy + ry * 0.2 + (i % 2) * ry * 0.1;
    const width = rx * 0.08;

    fangs += `
      <path d="M${baseX - width} ${baseY}
               L${baseX} ${tipY}
               L${baseX + width} ${baseY}
               Z"
            fill="${fangColor}" opacity="${opacity}"/>
    `;
  }

  return fangs;
}
