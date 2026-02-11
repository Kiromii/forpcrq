// ============================================================
// Pixel-art renderer for all game entities (canvas-based)
// ============================================================
import { COLORS } from '../data/constants';

/** Draw player (Silvia) – a cute pixel character, proportional to size */
export function drawPlayer(ctx, x, y, size, frame = 0) {
  const s = size; // alias
  const r = (v) => Math.round(v); // round helper

  // Shadow under character
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(r(x + s * 0.1), r(y + s - s * 0.08), r(s * 0.8), r(s * 0.08));

  // Body (dress)
  ctx.fillStyle = COLORS.player;
  ctx.fillRect(r(x + s * 0.15), r(y + s * 0.32), r(s * 0.7), r(s * 0.45));

  // Head (skin)
  ctx.fillStyle = '#fdcb6e';
  ctx.fillRect(r(x + s * 0.2), r(y + s * 0.08), r(s * 0.6), r(s * 0.3));

  // Hair
  ctx.fillStyle = '#e17055';
  ctx.fillRect(r(x + s * 0.15), r(y), r(s * 0.7), r(s * 0.18));
  // Hair sides
  ctx.fillRect(r(x + s * 0.12), r(y + s * 0.05), r(s * 0.12), r(s * 0.25));
  ctx.fillRect(r(x + s * 0.76), r(y + s * 0.05), r(s * 0.12), r(s * 0.25));

  // Eyes
  ctx.fillStyle = '#2d3436';
  const eyeSize = Math.max(3, r(s * 0.1));
  ctx.fillRect(r(x + s * 0.3), r(y + s * 0.18), eyeSize, eyeSize);
  ctx.fillRect(r(x + s * 0.6), r(y + s * 0.18), eyeSize, eyeSize);

  // Eye shine
  ctx.fillStyle = '#fff';
  const shineSize = Math.max(1, r(s * 0.04));
  ctx.fillRect(r(x + s * 0.31), r(y + s * 0.18), shineSize, shineSize);
  ctx.fillRect(r(x + s * 0.61), r(y + s * 0.18), shineSize, shineSize);

  // Blush
  ctx.fillStyle = '#fab1a0';
  ctx.fillRect(r(x + s * 0.22), r(y + s * 0.26), r(s * 0.12), r(s * 0.06));
  ctx.fillRect(r(x + s * 0.66), r(y + s * 0.26), r(s * 0.12), r(s * 0.06));

  // Smile
  ctx.fillStyle = '#e84393';
  ctx.fillRect(r(x + s * 0.38), r(y + s * 0.28), r(s * 0.24), r(s * 0.05));

  // Arms
  ctx.fillStyle = '#fdcb6e';
  ctx.fillRect(r(x + s * 0.05), r(y + s * 0.36), r(s * 0.12), r(s * 0.22));
  ctx.fillRect(r(x + s * 0.83), r(y + s * 0.36), r(s * 0.12), r(s * 0.22));

  // Legs (animate)
  const legOffset = frame % 2 === 0 ? 0 : r(s * 0.05);
  ctx.fillStyle = '#fdcb6e';
  ctx.fillRect(r(x + s * 0.25), r(y + s * 0.76 + legOffset), r(s * 0.15), r(s * 0.16));
  ctx.fillRect(r(x + s * 0.6), r(y + s * 0.76 - legOffset), r(s * 0.15), r(s * 0.16));

  // Shoes
  ctx.fillStyle = COLORS.player;
  ctx.fillRect(r(x + s * 0.22), r(y + s * 0.88 + legOffset), r(s * 0.18), r(s * 0.08));
  ctx.fillRect(r(x + s * 0.58), r(y + s * 0.88 - legOffset), r(s * 0.18), r(s * 0.08));

  // White outline for visibility
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 1;
  ctx.strokeRect(r(x + s * 0.12), r(y - 1), r(s * 0.76), r(s * 0.99));
}

/** Draw a heart collectible */
export function drawHeart(ctx, x, y, size, pulse = 0) {
  const s = size + Math.sin(pulse) * 2;
  const ox = x + (size - s) / 2;
  const oy = y + (size - s) / 2;
  ctx.fillStyle = COLORS.heart;
  ctx.fillRect(ox + s * 0.1, oy, s * 0.35, s * 0.35);
  ctx.fillRect(ox + s * 0.55, oy, s * 0.35, s * 0.35);
  ctx.fillRect(ox, oy + s * 0.2, s, s * 0.35);
  ctx.fillRect(ox + s * 0.1, oy + s * 0.5, s * 0.8, s * 0.25);
  ctx.fillRect(ox + s * 0.25, oy + s * 0.7, s * 0.5, s * 0.15);
  ctx.fillRect(ox + s * 0.4, oy + s * 0.82, s * 0.2, s * 0.1);
}

/** Draw a flower */
export function drawFlower(ctx, x, y, size) {
  const cx = x + size / 2,
    cy = y + size / 2;
  ctx.fillStyle = '#fd79a8';
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5;
    ctx.fillRect(cx + Math.cos(a) * 5 - 3, cy + Math.sin(a) * 5 - 3, 7, 7);
  }
  ctx.fillStyle = '#fdcb6e';
  ctx.fillRect(cx - 3, cy - 3, 6, 6);
}

/** Draw chocolate */
export function drawChocolate(ctx, x, y, size) {
  ctx.fillStyle = '#b33939';
  ctx.fillRect(x + 2, y + 4, size - 4, size - 8);
  ctx.fillStyle = '#e55039';
  ctx.fillRect(x + 4, y + 6, size - 8, 3);
  ctx.fillStyle = '#f8c291';
  ctx.fillRect(x + size / 2 - 3, y + 2, 6, 4);
}

/** Draw love letter */
export function drawLetter(ctx, x, y, size) {
  ctx.fillStyle = '#ffeaa7';
  ctx.fillRect(x + 2, y + 4, size - 4, size - 8);
  ctx.fillStyle = '#e17055';
  // Envelope flap
  ctx.fillRect(x + 2, y + 4, size - 4, 4);
  // Heart seal
  ctx.fillStyle = '#ff6b81';
  ctx.fillRect(x + size / 2 - 3, y + size / 2 - 2, 6, 5);
}

/** Draw star */
export function drawStar(ctx, x, y, size, pulse = 0) {
  const s = size + Math.sin(pulse) * 1.5;
  const cx = x + size / 2,
    cy = y + size / 2;
  ctx.fillStyle = COLORS.star;
  ctx.fillRect(cx - s * 0.1, cy - s * 0.4, s * 0.2, s * 0.8);
  ctx.fillRect(cx - s * 0.4, cy - s * 0.1, s * 0.8, s * 0.2);
  ctx.fillRect(cx - s * 0.25, cy - s * 0.25, s * 0.5, s * 0.5);
}

/** Draw lantern */
export function drawLantern(ctx, x, y, size) {
  ctx.fillStyle = COLORS.lantern;
  ctx.fillRect(x + 6, y + 2, size - 12, size - 4);
  ctx.fillStyle = '#e17055';
  ctx.fillRect(x + 8, y, size - 16, 4);
  // Glow
  ctx.fillStyle = 'rgba(253, 203, 110, 0.3)';
  ctx.fillRect(x - 2, y - 2, size + 4, size + 4);
}

/** Draw glowing heart */
export function drawGlowHeart(ctx, x, y, size, pulse = 0) {
  // Outer glow
  const glowSize = size + 12 + Math.sin(pulse) * 4;
  ctx.fillStyle = 'rgba(255, 107, 129, 0.15)';
  ctx.fillRect(x - (glowSize - size) / 2, y - (glowSize - size) / 2, glowSize, glowSize);
  const glowSize2 = size + 6 + Math.sin(pulse) * 2;
  ctx.fillStyle = 'rgba(255, 107, 129, 0.25)';
  ctx.fillRect(x - (glowSize2 - size) / 2, y - (glowSize2 - size) / 2, glowSize2, glowSize2);
  drawHeart(ctx, x, y, size, pulse);
}

/** Draw alarm clock obstacle */
export function drawAlarm(ctx, x, y, size) {
  ctx.fillStyle = COLORS.alarm;
  ctx.fillRect(x + 3, y + 4, size - 6, size - 6);
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + 6, y + 7, size - 12, size - 12);
  ctx.fillStyle = '#2d3436';
  ctx.fillRect(x + size / 2 - 1, y + 9, 2, 6);
  ctx.fillRect(x + size / 2 - 1, y + 9, 5, 2);
  // Bells
  ctx.fillStyle = COLORS.alarm;
  ctx.fillRect(x + 2, y + 2, 5, 4);
  ctx.fillRect(x + size - 7, y + 2, 5, 4);
}

/** Draw cactus obstacle */
export function drawCactus(ctx, x, y, size) {
  ctx.fillStyle = COLORS.cactus;
  ctx.fillRect(x + 8, y + 2, size - 16, size - 4);
  ctx.fillRect(x + 2, y + 8, 8, 6);
  ctx.fillRect(x + size - 10, y + 6, 8, 6);
  // Spines
  ctx.fillStyle = '#00e676';
  ctx.fillRect(x + 6, y + 4, 2, 2);
  ctx.fillRect(x + size - 8, y + 8, 2, 2);
}

/** Draw bench obstacle */
export function drawBench(ctx, x, y, size) {
  ctx.fillStyle = '#b33939';
  ctx.fillRect(x + 2, y + 10, size - 4, 6);
  ctx.fillStyle = '#6D4C41';
  ctx.fillRect(x + 4, y + 16, 4, 8);
  ctx.fillRect(x + size - 8, y + 16, 4, 8);
  ctx.fillRect(x + 2, y + 6, size - 4, 4);
}

/** Draw shadow obstacle */
export function drawShadow(ctx, x, y, size, pulse = 0) {
  const alpha = 0.4 + Math.sin(pulse) * 0.15;
  ctx.fillStyle = `rgba(20, 20, 40, ${alpha})`;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = `rgba(40, 40, 80, ${alpha + 0.1})`;
  ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
}

/** Draw pixel-style night cloud with optional glow effect */
export function drawCloud(ctx, x, y, size, alpha = 0.4, glow = false) {
  // Glow effect for night ambiance
  if (glow) {
    const glowSize = size * 1.3;
    const glowX = x - (glowSize - size) / 2;
    const glowY = y - (glowSize - size) / 2;
    ctx.fillStyle = `rgba(100, 140, 180, ${alpha * 0.2})`;
    ctx.fillRect(glowX + glowSize * 0.15, glowY + glowSize * 0.25, glowSize * 0.7, glowSize * 0.5);
    ctx.fillStyle = `rgba(120, 160, 200, ${alpha * 0.15})`;
    ctx.fillRect(glowX + glowSize * 0.05, glowY + glowSize * 0.3, glowSize * 0.9, glowSize * 0.4);
  }

  // Main cloud body - dark blue soft tone
  ctx.fillStyle = `rgba(60, 80, 120, ${alpha})`;
  // Center large puff
  ctx.fillRect(x + size * 0.2, y + size * 0.3, size * 0.6, size * 0.4);
  // Left puff
  ctx.fillRect(x, y + size * 0.4, size * 0.35, size * 0.3);
  // Right puff
  ctx.fillRect(x + size * 0.65, y + size * 0.35, size * 0.35, size * 0.35);
  // Top puffs
  ctx.fillRect(x + size * 0.25, y + size * 0.15, size * 0.25, size * 0.25);
  ctx.fillRect(x + size * 0.45, y + size * 0.2, size * 0.3, size * 0.2);

  // Lighter highlight for depth
  ctx.fillStyle = `rgba(80, 110, 150, ${alpha * 0.7})`;
  ctx.fillRect(x + size * 0.25, y + size * 0.35, size * 0.5, size * 0.25);
  ctx.fillRect(x + size * 0.3, y + size * 0.25, size * 0.2, size * 0.15);
}

/** Draw decorative floating heart (background) */
export function drawBgHeart(ctx, x, y, size, alpha = 0.15) {
  ctx.fillStyle = `rgba(232, 67, 147, ${alpha})`;
  ctx.fillRect(x, y, size * 0.4, size * 0.3);
  ctx.fillRect(x + size * 0.5, y, size * 0.4, size * 0.3);
  ctx.fillRect(x - size * 0.05, y + size * 0.2, size * 1.0, size * 0.3);
  ctx.fillRect(x + size * 0.1, y + size * 0.45, size * 0.7, size * 0.25);
  ctx.fillRect(x + size * 0.25, y + size * 0.65, size * 0.4, size * 0.15);
}

// Entity draw map for the game engine
export const DRAW_ITEM = {
  heart: drawHeart,
  flower: drawFlower,
  chocolate: drawChocolate,
  letter: drawLetter,
  star: drawStar,
  lantern: drawLantern,
  glow: drawGlowHeart,
};

export const DRAW_OBSTACLE = {
  alarm: drawAlarm,
  cactus: drawCactus,
  bench: drawBench,
  shadow: drawShadow,
};
