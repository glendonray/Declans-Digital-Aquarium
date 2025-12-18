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

/**
 * Hash a string to a numeric seed
 * @param {string} str - String to hash
 * @returns {number} Positive integer hash
 */
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator (mulberry32)
 * @param {number} seed - Numeric seed
 * @returns {number} Random number between 0 and 1
 */
export function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Shuffle an array deterministically using a seed
 * @param {Array} array - Array to shuffle
 * @param {number} seed - Numeric seed for deterministic shuffle
 * @returns {Array} New shuffled array
 */
export function seededShuffleArray(array, seed) {
  const shuffled = [...array];
  let currentSeed = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = hashString(String(currentSeed + i));
    const j = Math.floor(seededRandom(currentSeed) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
