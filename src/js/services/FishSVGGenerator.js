/**
 * Fish SVG Generator Service
 * Composes fish SVGs from shape templates and pattern overlays
 */

import { getShapeTemplate } from "../templates/shapes/index.js";
import { getPatternOverlay } from "../templates/patterns/index.js";
import { generateId } from "../templates/utils/color.js";

/**
 * Generate a complete fish SVG from fish data
 * @param {Object} fishData - Fish data with appearance and colors
 * @returns {string} Complete SVG string
 */
export function generateFishSVG(fishData) {
  try {
    return generateFromTemplate(fishData);
  } catch (error) {
    console.error("Error generating fish SVG:", error);
    // Fallback to static image if template fails
    return createFallbackImage(fishData);
  }
}

/**
 * Generate SVG from templates
 * @param {Object} fishData - Fish data
 * @returns {string} SVG string
 */
function generateFromTemplate(fishData) {
  const { appearance = {}, colors = {} } = fishData;
  const { bodyShape = "oval", pattern = "solid" } = appearance;

  // Default colors if not provided
  const fishColors = {
    primary: colors.primary || "#FF6B35",
    secondary: colors.secondary || "#FFFFFF",
    accent: colors.accent || "#000000",
  };

  // Generate unique ID for this fish's SVG elements
  const fishId = generateId(fishData.id || "fish");

  // Get and execute shape template
  const shapeTemplate = getShapeTemplate(bodyShape);
  const shape = shapeTemplate(fishColors, { id: fishId });

  // Get and execute pattern template
  const patternTemplate = getPatternOverlay(pattern);
  const patternResult = patternTemplate(fishColors, shape.patternArea, {
    id: fishId,
  });

  // Compose final SVG
  return composeSVG(shape, patternResult, fishId);
}

/**
 * Compose all SVG parts into final SVG string
 * @param {Object} shape - Shape template result
 * @param {string|Object} pattern - Pattern result (string or object with defs/elements)
 * @param {string} id - Unique ID
 * @returns {string} Complete SVG string
 */
function composeSVG(shape, pattern, id) {
  const { viewBox, width, height, defs, tail, body, fins, face } = shape;

  // Handle pattern that might be string or object
  let patternDefs = "";
  let patternElements = "";

  if (typeof pattern === "string") {
    patternElements = pattern;
  } else if (pattern && typeof pattern === "object") {
    patternDefs = pattern.defs || "";
    patternElements = pattern.elements || "";
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
      <defs>
        ${defs}
        ${patternDefs}
      </defs>
      <g id="${id}-fish">
        <!-- Tail -->
        ${tail || ""}
        <!-- Body -->
        ${body}
        <!-- Pattern Overlay -->
        ${patternElements}
        <!-- Fins -->
        ${fins || ""}
        <!-- Face -->
        ${face || ""}
      </g>
    </svg>
  `.trim();
}

/**
 * Create fallback image element
 * @param {Object} fishData - Fish data
 * @returns {string} Fallback img element
 */
function createFallbackImage(fishData) {
  const imagePath = fishData.image || `assets/fish/${fishData.id}.svg`;
  const name = fishData.name || "Fish";
  return `<img src="${imagePath}" alt="${name}" class="fish__sprite"/>`;
}

/**
 * Check if a fish can be rendered with templates
 * @param {Object} fishData - Fish data
 * @returns {boolean} True if template-renderable
 */
export function canRenderWithTemplate(fishData) {
  const { appearance = {} } = fishData;
  const { bodyShape = "oval" } = appearance;

  // Check if we have a template for this shape
  const shapeTemplate = getShapeTemplate(bodyShape);
  return shapeTemplate !== null;
}
