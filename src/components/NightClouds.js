// ============================================================
// Night Clouds – Parallax cloud system for night levels
// ============================================================

/**
 * Check if a bgColor indicates night mode
 * @param {string} bgColor - Background color hex
 * @returns {boolean}
 */
export function isNightMode(bgColor) {
  const darkBgs = ['#1a1a2e', '#0f0f23', '#0d0d1a', '#151530'];
  return darkBgs.includes(bgColor?.toLowerCase());
}

/**
 * Generate initial cloud array
 * @param {number} canvasW - Canvas width
 * @param {number} canvasH - Canvas height
 * @param {number} count - Number of clouds (3-6)
 * @returns {Array} clouds array
 */
export function generateClouds(canvasW, canvasH, count = 5) {
  const clouds = [];

  for (let i = 0; i < count; i++) {
    // Depth layer (0 = far/slow, 1 = near/fast)
    const depth = Math.random();

    // Size based on depth (far clouds smaller, near clouds larger)
    const baseSize = 50 + depth * 40; // 50-90px

    // Speed based on depth (parallax effect)
    const speed = 0.15 + depth * 0.35; // 0.15-0.5 px/frame

    // Alpha based on depth (far clouds more transparent)
    const alpha = 0.2 + depth * 0.25; // 0.2-0.45

    clouds.push({
      id: i,
      x: Math.random() * (canvasW + 100) - 50, // Can start off-screen
      y: 20 + Math.random() * (canvasH * 0.4), // Top 45% of screen
      size: baseSize,
      speed: speed,
      alpha: alpha,
      depth: depth,
      glow: depth > 0.5, // Only near clouds have glow
    });
  }

  // Sort by depth (far clouds first, so near clouds render on top)
  return clouds.sort((a, b) => a.depth - b.depth);
}

/**
 * Update cloud positions (call each frame)
 * Moves clouds right → left with infinite loop
 * @param {Array} clouds - Clouds array
 * @param {number} canvasW - Canvas width
 */
export function updateClouds(clouds, canvasW) {
  clouds.forEach((cloud) => {
    cloud.x -= cloud.speed;

    // Wrap around when cloud exits left side
    if (cloud.x + cloud.size < -20) {
      cloud.x = canvasW + 20 + Math.random() * 50;
      // Slightly randomize y on each loop
      cloud.y = 20 + Math.random() * (canvasW * 0.4);
    }
  });
}
