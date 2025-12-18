/**
 * FishSelector Service
 * Selects diverse fish to ensure visual variety in the tank
 */

import { shuffleArray } from "../utils/random.js";

/**
 * Select a diverse set of fish from the index
 * Ensures variety in body shapes and colors
 * Defaults to saltwater only (Declan's reef aquarium)
 *
 * @param {Array} index - Array of fish summary objects from index.json
 * @param {number} count - Number of fish to select (default: 8)
 * @param {Array} excludeIds - Fish IDs to exclude from selection
 * @returns {Array} Selected fish summaries
 */
export function selectDiverseFish(index, count = 8, excludeIds = []) {
  // Filter to saltwater only (Declan's reef aquarium)
  const saltwaterOnly = index.filter((f) => f.waterType === "saltwater");
  // Filter out excluded fish
  const available = saltwaterOnly.filter((f) => !excludeIds.includes(f.id));

  if (available.length === 0) {
    return [];
  }

  if (available.length <= count) {
    return shuffleArray([...available]);
  }

  // Shuffle for randomness
  const shuffled = shuffleArray([...available]);

  const selected = [];
  const usedShapes = new Set();
  const usedColors = new Set();

  // First pass: prioritize diversity
  for (const fish of shuffled) {
    if (selected.length >= count) break;

    const shapeUsed = usedShapes.has(fish.bodyShape);
    const colorUsed = usedColors.has(fish.primaryColor);

    // Prefer fish that add diversity
    if (!shapeUsed || !colorUsed) {
      selected.push(fish);
      usedShapes.add(fish.bodyShape);
      usedColors.add(fish.primaryColor);
    }
  }

  // Second pass: fill remaining slots if needed
  if (selected.length < count) {
    const selectedIds = new Set(selected.map((f) => f.id));
    for (const fish of shuffled) {
      if (selected.length >= count) break;
      if (!selectedIds.has(fish.id)) {
        selected.push(fish);
      }
    }
  }

  return selected;
}

/**
 * Select fish by water type
 * @param {Array} index - Fish index
 * @param {string} waterType - 'freshwater', 'saltwater', or 'brackish'
 * @param {number} count - Number to select
 * @returns {Array} Selected fish
 */
export function selectByWaterType(index, waterType, count = 8) {
  const filtered = index.filter((f) => f.waterType === waterType);
  return selectDiverseFish(filtered, count);
}

/**
 * Select fish by habitat
 * @param {Array} index - Fish index
 * @param {string} habitat - Habitat type (e.g., 'reef', 'tropical')
 * @param {number} count - Number to select
 * @returns {Array} Selected fish
 */
export function selectByHabitat(index, habitat, count = 8) {
  const filtered = index.filter((f) => f.habitat === habitat);
  return selectDiverseFish(filtered, count);
}

/**
 * Select fish by body shape
 * @param {Array} index - Fish index
 * @param {string} bodyShape - Body shape type
 * @param {number} count - Number to select
 * @returns {Array} Selected fish
 */
export function selectByBodyShape(index, bodyShape, count = 8) {
  const filtered = index.filter((f) => f.bodyShape === bodyShape);
  return shuffleArray(filtered).slice(0, count);
}

/**
 * Get a completely different set of fish (no overlap with current)
 * @param {Array} index - Fish index
 * @param {Array} currentIds - Currently displayed fish IDs
 * @param {number} count - Number to select
 * @returns {Array} New fish selection with no overlap
 */
export function selectNewFish(index, currentIds, count = 8) {
  return selectDiverseFish(index, count, currentIds);
}
