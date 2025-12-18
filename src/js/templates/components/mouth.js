/**
 * Mouth Component
 * Creates various fish mouth styles
 */

/**
 * Create a simple curved mouth
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Mouth options
 * @returns {string} SVG elements for the mouth
 */
export function createMouth(x, y, options = {}) {
  const { style = "smile", size = "medium", color = "#000" } = options;

  const sizes = {
    small: { width: 3, curve: 2 },
    medium: { width: 4, curve: 3 },
    large: { width: 6, curve: 4 },
  };

  const s = sizes[size] || sizes.medium;

  switch (style) {
    case "smile":
      return `<path d="M${x} ${y} Q${x + s.width} ${y + s.curve} ${x} ${
        y + s.curve * 2
      }" 
                    stroke="${color}" stroke-width="1.5" fill="none"/>`;

    case "o":
      return `<ellipse cx="${x}" cy="${y}" rx="${s.width}" ry="${s.curve}" 
                       fill="#1E293B" stroke="${color}" stroke-width="1"/>`;

    case "pouty":
      return `
        <ellipse cx="${x}" cy="${y}" rx="${s.width}" ry="${s.curve - 1}" 
                 fill="#FBBF24" stroke="${color}" stroke-width="1"/>
        <path d="M${x - s.width + 1} ${y} L${x + s.width - 1} ${y}" 
              stroke="${color}" stroke-width="1"/>
      `;

    case "line":
      return `<path d="M${x - s.width} ${y} L${x + s.width} ${y}" 
                    stroke="${color}" stroke-width="1.5"/>`;

    case "wide":
      return `<path d="M${x - s.width} ${y} Q${x} ${y + s.curve} ${
        x + s.width
      } ${y}" 
                    fill="#1E293B"/>`;

    default:
      return `<path d="M${x} ${y} Q${x + s.width} ${y + s.curve} ${x} ${
        y + s.curve * 2
      }" 
                    stroke="${color}" stroke-width="1.5" fill="none"/>`;
  }
}
