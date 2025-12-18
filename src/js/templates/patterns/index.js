/**
 * Pattern Templates Index
 * Registry of all pattern overlay templates
 */

import { solidPattern } from "./solid.js";
import { stripedPattern } from "./striped.js";
import { gradientPattern } from "./gradient.js";
import { spottedPattern } from "./spotted.js";
import { bandedPattern } from "./banded.js";
import { mottledPattern } from "./mottled.js";
import { swirledPattern } from "./swirled.js";

// Pattern registry - maps pattern names to template functions
const patternRegistry = {
  solid: solidPattern,
  striped: stripedPattern,
  gradient: gradientPattern,
  spotted: spottedPattern,
  banded: bandedPattern,
  mottled: mottledPattern,
  swirled: swirledPattern,
};

/**
 * Get a pattern template function by name
 * @param {string} patternName - Name of the pattern
 * @returns {Function} Pattern template function
 */
export function getPatternOverlay(patternName) {
  const template = patternRegistry[patternName];
  if (!template) {
    console.warn(`Pattern template "${patternName}" not found, using solid`);
    return patternRegistry.solid;
  }
  return template;
}

/**
 * Register a new pattern template
 * @param {string} name - Pattern name
 * @param {Function} template - Pattern template function
 */
export function registerPattern(name, template) {
  patternRegistry[name] = template;
}

/**
 * Get list of available patterns
 * @returns {string[]} Array of pattern names
 */
export function getAvailablePatterns() {
  return Object.keys(patternRegistry);
}
