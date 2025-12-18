/**
 * Pattern Templates Index
 * Registry of all pattern overlay templates
 */

// Original patterns
import { solidPattern } from "./solid.js";
import { stripedPattern } from "./striped.js";
import { gradientPattern } from "./gradient.js";
import { spottedPattern } from "./spotted.js";
import { bandedPattern } from "./banded.js";
import { mottledPattern } from "./mottled.js";
import { swirledPattern } from "./swirled.js";

// Two-tone/region patterns (bicolor.js)
import { bicolorPattern, halfDarkPattern, cappedPattern, maskedPattern, saddledPattern, girdledPattern, keyholePattern } from "./bicolor.js";

// Linear patterns
import { barredPattern } from "./barred.js";
import { linedPattern } from "./lined.js";
import { chevronPattern } from "./chevron.js";

// Spot variations (scaled.js, leopard.js, snowflake.js, eyespot.js)
import { scaledPattern, pearlscalePattern, teardropPattern } from "./scaled.js";
import { leopardPattern } from "./leopard.js";
import { snowflakePattern, cosmicPattern } from "./snowflake.js";
import { eyespotPattern, targetPattern, mimicPattern } from "./eyespot.js";

// Solid variations (velvet.js)
import { velvetPattern, nearlySolidPattern, mostlyWhitePattern } from "./velvet.js";

// Complex patterns (multicolor.js, marbled.js, flame.js)
import { multicolorPattern } from "./multicolor.js";
import { marbledPattern, stormyPattern, flurryPattern, scribbledPattern } from "./marbled.js";
import { flamePattern } from "./flame.js";

// Structural patterns (ringed.js, crowned.js, angular.js)
import { ringedPattern, filamentsPattern } from "./ringed.js";
import { crownedPattern, fangedPattern } from "./crowned.js";
import { angularPattern, sailPattern, pyramidPattern, crosshatchPattern, incompleteBandsPattern, markedPattern } from "./angular.js";

// Pattern registry - maps pattern names to template functions
const patternRegistry = {
  // Original patterns
  solid: solidPattern,
  striped: stripedPattern,
  gradient: gradientPattern,
  spotted: spottedPattern,
  banded: bandedPattern,
  mottled: mottledPattern,
  swirled: swirledPattern,

  // Two-tone/region patterns
  bicolor: bicolorPattern,
  "half-dark": halfDarkPattern,
  capped: cappedPattern,
  masked: maskedPattern,
  saddled: saddledPattern,
  girdled: girdledPattern,
  keyhole: keyholePattern,

  // Linear patterns
  barred: barredPattern,
  lined: linedPattern,
  chevron: chevronPattern,

  // Spot variations
  scaled: scaledPattern,
  pearlscale: pearlscalePattern,
  teardrop: teardropPattern,
  leopard: leopardPattern,
  snowflake: snowflakePattern,
  cosmic: cosmicPattern,
  eyespot: eyespotPattern,
  target: targetPattern,
  mimic: mimicPattern,

  // Solid variations
  velvet: velvetPattern,
  "nearly-solid": nearlySolidPattern,
  "mostly-white": mostlyWhitePattern,

  // Complex patterns
  multicolor: multicolorPattern,
  marbled: marbledPattern,
  stormy: stormyPattern,
  flurry: flurryPattern,
  scribbled: scribbledPattern,
  flame: flamePattern,

  // Structural patterns
  ringed: ringedPattern,
  filaments: filamentsPattern,
  crowned: crownedPattern,
  fanged: fangedPattern,
  angular: angularPattern,
  sail: sailPattern,
  pyramid: pyramidPattern,
  crosshatch: crosshatchPattern,
  "incomplete-bands": incompleteBandsPattern,
  marked: markedPattern,
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
