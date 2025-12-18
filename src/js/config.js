/**
 * Aquarium Configuration
 * Controls fish display behavior - can be hooked up to UI later
 */

export const config = {
  /**
   * Display mode for fish:
   * - 'all': Show every fish in the JSON
   * - 'limited': Show maxFish from the pool on page load
   * - 'rotate': Show maxFish at a time, swap one fish every rotateInterval
   * - 'daily': Show same maxFish for everyone each day (date-seeded)
   */
  displayMode: "daily",

  /**
   * Maximum fish to show at once
   * Used when displayMode is 'limited' or 'rotate'
   */
  maxFish: 8,

  /**
   * Rotation interval in milliseconds
   * Used when displayMode is 'rotate'
   * Default: 30000 (30 seconds)
   */
  rotateInterval: 30000,

  /**
   * Whether to shuffle fish selection
   * Used with 'limited' and 'rotate' modes
   */
  shuffleOnLoad: true,

  /**
   * Enable diverse selection algorithm
   * When true, selects fish with varied body shapes and colors
   * When false, uses simple random selection
   */
  enableDiverseSelection: true,
};
