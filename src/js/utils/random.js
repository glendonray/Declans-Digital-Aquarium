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

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
