// ============================================================
// Game-wide constants and level configuration
// ============================================================

export const CANVAS_W = 480;
export const CANVAS_H = 360;
export const PLAYER_SIZE = 38;
export const ITEM_SIZE = 26;
export const OBSTACLE_SIZE = 28;
export const PLAYER_SPEED = 4;
export const GRAVITY = 0;

export const COLORS = {
  bg: '#ffe4f0',
  bgAlt: '#ffd6e8',
  player: '#e84393',
  heart: '#ff6b81',
  flower: '#fd79a8',
  chocolate: '#b33939',
  letter: '#e17055',
  star: '#ffeaa7',
  lantern: '#fdcb6e',
  glow: '#ff6b81',
  obstacle: '#636e72',
  alarm: '#d63031',
  cactus: '#00b894',
  puddle: '#74b9ff',
  cat: '#2d3436',
  text: '#2d3436',
  textLight: '#fdfdfd',
  accent: '#e84393',
  panel: '#fff0f5',
  panelBorder: '#f8a5c2',
  gold: '#f9ca24',
};

// Level definitions
export const LEVELS = [
  {
    id: 1,
    name: 'Pagi Valentine',
    subtitle: 'Kumpulkan hati, hindari jam weker!',
    bgColor: '#fff0f5',
    targetScore: 12,
    spawnRate: 1200,
    obstacleRate: 2500,
    duration: 90,
    itemType: 'heart',
    obstacleType: 'alarm',
  },
  {
    id: 2,
    name: 'Persiapan untuk Silvia',
    subtitle: 'Kumpulkan bunga, cokelat & surat cinta!',
    bgColor: '#fce4ec',
    targetScore: 15,
    spawnRate: 1000,
    obstacleRate: 2200,
    duration: 100,
    itemType: 'mixed',
    obstacleType: 'cactus',
  },
  {
    id: 3,
    name: 'Waktu Kencan',
    subtitle: 'Jalan romantis di bawah bintang…',
    bgColor: '#1a1a2e',
    targetScore: 18,
    spawnRate: 1100,
    obstacleRate: 2800,
    duration: 120,
    itemType: 'star',
    obstacleType: 'bench',
  },
  {
    id: 4,
    name: 'Jalan Malam',
    subtitle: 'Kejar hati yang bersinar…',
    bgColor: '#0f0f23',
    targetScore: 10,
    spawnRate: 1400,
    obstacleRate: 3000,
    duration: 90,
    itemType: 'glow',
    obstacleType: 'shadow',
  },
];

// Save / Load helpers
export const saveProgress = (level) => {
  localStorage.setItem('valentinequest_progress', JSON.stringify({ level }));
};

export const loadProgress = () => {
  try {
    const data = JSON.parse(localStorage.getItem('valentinequest_progress'));
    return data?.level || 0;
  } catch {
    return 0;
  }
};

export const clearProgress = () => {
  localStorage.removeItem('valentinequest_progress');
};
