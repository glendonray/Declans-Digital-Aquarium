/**
 * Eye Component
 * Creates cute fish eyes with highlights
 */

/**
 * Create a cute eye with highlight
 * @param {number} cx - Center X position
 * @param {number} cy - Center Y position
 * @param {Object} options - Eye options
 * @returns {string} SVG elements for the eye
 */
export function createEye(cx, cy, options = {}) {
  const { size = "medium", color = "#000", direction = "right" } = options;

  // Size presets
  const sizes = {
    tiny: { outer: 4, inner: 2.5, highlight: 0.8 },
    small: { outer: 5, inner: 3, highlight: 1 },
    medium: { outer: 7, inner: 4, highlight: 1.5 },
    large: { outer: 10, inner: 6, highlight: 2 },
  };

  const s = sizes[size] || sizes.medium;
  const offsetX = direction === "right" ? 2 : -2;

  return `
    <circle cx="${cx}" cy="${cy}" r="${s.outer}" fill="#FFF"/>
    <circle cx="${cx + offsetX}" cy="${cy}" r="${s.inner}" fill="${color}"/>
    <circle cx="${cx + offsetX + 1}" cy="${cy - 2}" r="${
    s.highlight
  }" fill="#FFF"/>
  `;
}

/**
 * Create a pair of eyes (for front-facing fish)
 * @param {number} leftX - Left eye X
 * @param {number} rightX - Right eye X
 * @param {number} y - Y position for both eyes
 * @param {Object} options - Eye options
 * @returns {string} SVG elements for both eyes
 */
export function createEyePair(leftX, rightX, y, options = {}) {
  return (
    createEye(leftX, y, { ...options, direction: "left" }) +
    createEye(rightX, y, { ...options, direction: "right" })
  );
}
