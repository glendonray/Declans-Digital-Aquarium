/**
 * DailyFishService
 * Manages daily fish rotation using date-seeded selection
 */

import { hashString, seededShuffleArray } from "../utils/random.js";

const STORAGE_KEY = "aquarium_lastVisitDate";

/**
 * Get today's date as YYYY-MM-DD string
 * @returns {string} Date string
 */
function getTodayString() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Get the seed for today's date
 * @returns {number} Numeric seed based on today's date
 */
export function getTodaysSeed() {
  return hashString(getTodayString());
}

/**
 * Select daily fish using deterministic date-seeded selection
 * Same fish for everyone on any given day
 * @param {Array} index - Fish index array
 * @param {number} count - Number of fish to select (default: 8)
 * @returns {Array} Selected fish for today
 */
export function selectDailyFish(index, count = 8) {
  // Filter to saltwater only (Declan's reef aquarium)
  const saltwaterOnly = index.filter((f) => f.waterType === "saltwater");

  if (saltwaterOnly.length === 0) {
    return [];
  }

  if (saltwaterOnly.length <= count) {
    return seededShuffleArray(saltwaterOnly, getTodaysSeed());
  }

  // Use seeded shuffle for deterministic daily selection
  const seed = getTodaysSeed();
  const shuffled = seededShuffleArray(saltwaterOnly, seed);

  // Take first `count` fish, but ensure diversity in shapes and colors
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
 * Check if this is a new day since last visit
 * @returns {boolean} True if it's a new day
 */
export function isNewDay() {
  const lastVisit = localStorage.getItem(STORAGE_KEY);
  const today = getTodayString();
  return lastVisit !== today;
}

/**
 * Mark today as visited (updates localStorage)
 */
export function markVisited() {
  localStorage.setItem(STORAGE_KEY, getTodayString());
}

/**
 * Get the last visit date
 * @returns {string|null} Last visit date or null if never visited
 */
export function getLastVisitDate() {
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Clear visit history (for testing)
 */
export function clearVisitHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
