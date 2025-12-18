/**
 * Shape Templates Index
 * Registry of all body shape templates
 */

import { ovalShape } from "./oval.js";
import { discShape } from "./disc.js";
import { roundShape } from "./round.js";
import { streamlinedShape } from "./streamlined.js";
import { unusualShape } from "./unusual.js";
import { flatShape } from "./flat.js";
import { elongatedShape } from "./elongated.js";

// Shape registry - maps shape names to template functions
const shapeRegistry = {
  oval: ovalShape,
  disc: discShape,
  round: roundShape,
  streamlined: streamlinedShape,
  unusual: unusualShape,
  flat: flatShape,
  elongated: elongatedShape,
};

/**
 * Get a shape template function by name
 * @param {string} shapeName - Name of the shape
 * @returns {Function} Shape template function
 */
export function getShapeTemplate(shapeName) {
  const template = shapeRegistry[shapeName];
  if (!template) {
    console.warn(`Shape template "${shapeName}" not found, using oval`);
    return shapeRegistry.oval;
  }
  return template;
}

/**
 * Register a new shape template
 * @param {string} name - Shape name
 * @param {Function} template - Shape template function
 */
export function registerShape(name, template) {
  shapeRegistry[name] = template;
}

/**
 * Get list of available shapes
 * @returns {string[]} Array of shape names
 */
export function getAvailableShapes() {
  return Object.keys(shapeRegistry);
}
