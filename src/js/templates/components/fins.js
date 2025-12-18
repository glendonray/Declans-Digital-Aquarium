/**
 * Fins Component
 * Creates various fish fin styles
 */

/**
 * Create a dorsal (top) fin
 * @param {number} x - Start X position
 * @param {number} y - Base Y position
 * @param {Object} options - Fin options
 * @returns {string} SVG path for dorsal fin
 */
export function createDorsalFin(x, y, options = {}) {
  const {
    fill = "#FFA500",
    stroke = "#000",
    style = "rounded",
    width = 20,
    height = 10,
  } = options;

  switch (style) {
    case "pointed":
      return `<path d="M${x} ${y} Q${x + width / 2} ${y - height * 1.5} ${
        x + width
      } ${y}" 
                    fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;

    case "spiky":
      const spikes = 3;
      let path = `M${x} ${y}`;
      for (let i = 0; i < spikes; i++) {
        const spikeX = x + (width / spikes) * (i + 0.5);
        path += ` L${spikeX} ${y - height} L${
          x + (width / spikes) * (i + 1)
        } ${y}`;
      }
      return `<path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    case "flowing":
      return `<path d="M${x} ${y} Q${x + width * 0.3} ${y - height} ${
        x + width * 0.5
      } ${y - height * 0.8} 
                       Q${x + width * 0.7} ${y - height * 0.6} ${
        x + width
      } ${y}" 
                    fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    case "rounded":
    default:
      return `<path d="M${x} ${y} Q${x + width / 2} ${y - height} ${
        x + width
      } ${y}" 
                    fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
  }
}

/**
 * Create a pectoral (side) fin
 * @param {number} cx - Center X position
 * @param {number} cy - Center Y position
 * @param {Object} options - Fin options
 * @returns {string} SVG element for pectoral fin
 */
export function createPectoralFin(cx, cy, options = {}) {
  const {
    fill = "#FFA500",
    stroke = "#000",
    rx = 8,
    ry = 5,
    angle = 0,
  } = options;

  const transform =
    angle !== 0 ? ` transform="rotate(${angle} ${cx} ${cy})"` : "";

  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" 
                   fill="${fill}" stroke="${stroke}" stroke-width="1"${transform}/>`;
}

/**
 * Create a tail fin
 * @param {number} x - X position (left side of tail)
 * @param {number} y - Center Y position
 * @param {Object} options - Fin options
 * @returns {string} SVG elements for tail fin
 */
export function createTailFin(x, y, options = {}) {
  const {
    fill = "#FFA500",
    stroke = "#000",
    style = "forked",
    size = 15,
  } = options;

  switch (style) {
    case "forked":
      return `<path d="M${x} ${y} Q${x - size * 0.5} ${y - size} ${x - size} ${
        y - size * 0.8
      } 
                       Q${x - size * 0.3} ${y} ${x - size} ${y + size * 0.8} 
                       Q${x - size * 0.5} ${y + size} ${x} ${y}" 
                    fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    case "rounded":
      return `<ellipse cx="${x - size / 2}" cy="${y}" rx="${
        size / 2
      }" ry="${size}" 
                       fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    case "fan":
      return `<path d="M${x} ${y} L${x - size} ${y - size} Q${
        x - size * 1.2
      } ${y} ${x - size} ${y + size} Z" 
                    fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    case "crescent":
      return `<path d="M${x} ${y} Q${x - size * 0.8} ${y - size * 0.5} ${
        x - size
      } ${y - size * 0.3}
                       Q${x - size * 0.5} ${y} ${x - size} ${y + size * 0.3}
                       Q${x - size * 0.8} ${y + size * 0.5} ${x} ${y}" 
                    fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;

    default:
      return `<ellipse cx="${x - size / 2}" cy="${y}" rx="${
        size / 2
      }" ry="${size}" 
                       fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;
  }
}

/**
 * Create an anal (bottom) fin
 * @param {number} x - Start X position
 * @param {number} y - Base Y position
 * @param {Object} options - Fin options
 * @returns {string} SVG path for anal fin
 */
export function createAnalFin(x, y, options = {}) {
  const { fill = "#FFA500", stroke = "#000", width = 15, height = 8 } = options;

  return `<path d="M${x} ${y} Q${x + width / 2} ${y + height} ${
    x + width
  } ${y}" 
                fill="${fill}" stroke="${stroke}" stroke-width="0.5"/>`;
}
