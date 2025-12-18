/**
 * Random utility functions
 */

/**
 * Get a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
export function randomIntBetween(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

/**
 * Get a random item from an array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item from the array
 */
export function randomFrom(array) {
  return array[randomIntBetween(0, array.length - 1)];
}

/**
 * Get a random boolean with optional probability
 * @param {number} probability - Probability of true (0-1), defaults to 0.5
 * @returns {boolean} Random boolean
 */
export function randomBool(probability = 0.5) {
  return Math.random() < probability;
}
