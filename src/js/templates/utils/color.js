/**
 * Color Utility Functions
 * Helper functions for color manipulation in SVG templates
 */

/**
 * Lighten a hex color
 * @param {string} hex - Hex color (e.g., "#FF6B35")
 * @param {number} percent - Percent to lighten (0-100)
 * @returns {string} Lightened hex color
 */
export function lighten(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

/**
 * Darken a hex color
 * @param {string} hex - Hex color
 * @param {number} percent - Percent to darken (0-100)
 * @returns {string} Darkened hex color
 */
export function darken(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

/**
 * Add transparency to a hex color
 * @param {string} hex - Hex color
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
export function withAlpha(hex, alpha) {
  const num = parseInt(hex.replace("#", ""), 16);
  const R = num >> 16;
  const G = (num >> 8) & 0x00ff;
  const B = num & 0x0000ff;
  return `rgba(${R}, ${G}, ${B}, ${alpha})`;
}

/**
 * Generate a unique ID for SVG gradients
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export function generateId(prefix = "fish") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
