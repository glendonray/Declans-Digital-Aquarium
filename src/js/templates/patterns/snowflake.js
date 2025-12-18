/**
 * Snowflake Pattern
 * Snowflake-like crystalline patterns
 */

/**
 * Generate snowflake pattern overlay
 * @param {Object} colors - Color scheme { primary, secondary, accent }
 * @param {Object} patternArea - Area to apply pattern { cx, cy, rx, ry }
 * @param {Object} options - Pattern options
 * @returns {string} SVG elements for snowflake pattern
 */
export function snowflakePattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { flakeCount = 8, flakeColor = secondary, flakeSize = 3, opacity = 0.8 } = options;

  let flakes = "";

  for (let i = 0; i < flakeCount; i++) {
    const angle = (i / flakeCount) * Math.PI * 2 + i * 0.9;
    const radiusFactor = 0.2 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 0.5;

    const flakeX = cx + Math.cos(angle) * rx * radiusFactor;
    const flakeY = cy + Math.sin(angle) * ry * radiusFactor;
    const size = flakeSize + (i % 2);

    // Create 6-pointed snowflake
    let flakePath = "";
    for (let arm = 0; arm < 6; arm++) {
      const armAngle = (arm / 6) * Math.PI * 2;
      const endX = flakeX + Math.cos(armAngle) * size;
      const endY = flakeY + Math.sin(armAngle) * size;

      // Main arm
      flakePath += `M${flakeX} ${flakeY} L${endX} ${endY} `;

      // Small branches on each arm
      const branchLen = size * 0.4;
      const midX = flakeX + Math.cos(armAngle) * size * 0.6;
      const midY = flakeY + Math.sin(armAngle) * size * 0.6;

      const branch1Angle = armAngle + Math.PI / 4;
      const branch2Angle = armAngle - Math.PI / 4;

      flakePath += `M${midX} ${midY} L${midX + Math.cos(branch1Angle) * branchLen} ${midY + Math.sin(branch1Angle) * branchLen} `;
      flakePath += `M${midX} ${midY} L${midX + Math.cos(branch2Angle) * branchLen} ${midY + Math.sin(branch2Angle) * branchLen} `;
    }

    flakes += `
      <path d="${flakePath}" 
            stroke="${flakeColor}" stroke-width="0.8" fill="none"
            opacity="${opacity}"/>
    `;
  }

  return flakes;
}

/**
 * Generate cosmic pattern - star-like scattered dots
 */
export function cosmicPattern(colors, patternArea, options = {}) {
  const { secondary = "#FFFFFF", accent = "#FFD700" } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { starCount = 15, opacity = 0.9 } = options;

  let stars = "";

  for (let i = 0; i < starCount; i++) {
    const angle = (i / starCount) * Math.PI * 2 + i * 1.7;
    const radiusFactor = 0.15 + (Math.sin(i * 2.3) * 0.5 + 0.5) * 0.6;

    const starX = cx + Math.cos(angle) * rx * radiusFactor;
    const starY = cy + Math.sin(angle) * ry * radiusFactor;
    const size = 0.8 + (i % 3) * 0.5;
    const color = i % 3 === 0 ? accent : secondary;

    // Simple 4-pointed star
    stars += `
      <path d="M${starX} ${starY - size} L${starX + size * 0.3} ${starY} L${starX} ${starY + size} L${starX - size * 0.3} ${starY} Z
               M${starX - size} ${starY} L${starX} ${starY + size * 0.3} L${starX + size} ${starY} L${starX} ${starY - size * 0.3} Z" 
            fill="${color}" opacity="${opacity}"/>
    `;
  }

  return stars;
}
