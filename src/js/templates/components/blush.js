/**
 * Blush Component
 * Creates cute kawaii-style blush marks
 */

/**
 * Lighten a hex color
 * @param {string} hex - Hex color
 * @param {number} percent - Percent to lighten
 * @returns {string} Lightened hex color
 */
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

/**
 * Create a blush mark
 * @param {number} cx - Center X position
 * @param {number} cy - Center Y position
 * @param {Object} options - Blush options
 * @returns {string} SVG elements for the blush
 */
export function createBlush(cx, cy, options = {}) {
  const { baseColor = "#FF6B35", size = "medium", opacity = 0.5 } = options;

  const sizes = {
    small: { rx: 3, ry: 1.5 },
    medium: { rx: 4, ry: 2 },
    large: { rx: 6, ry: 3 },
  };

  const s = sizes[size] || sizes.medium;
  const blushColor = lightenColor(baseColor, 40);

  return `<ellipse cx="${cx}" cy="${cy}" rx="${s.rx}" ry="${s.ry}" 
                   fill="${blushColor}" opacity="${opacity}"/>`;
}

/**
 * Create a pair of blush marks (for both cheeks)
 * @param {number} leftX - Left blush X
 * @param {number} rightX - Right blush X
 * @param {number} y - Y position
 * @param {Object} options - Blush options
 * @returns {string} SVG elements for both blushes
 */
export function createBlushPair(leftX, rightX, y, options = {}) {
  return createBlush(leftX, y, options) + createBlush(rightX, y, options);
}
