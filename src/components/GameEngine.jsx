import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CANVAS_W, CANVAS_H, PLAYER_SIZE, ITEM_SIZE, OBSTACLE_SIZE, PLAYER_SPEED, LEVELS, COLORS, saveProgress } from '../data/constants';
import {
  level1Pickup,
  level1Hit,
  level1Complete,
  level1Intro,
  level2Pickup,
  level2Hit,
  level2Complete,
  level2Intro,
  level3Pickup,
  level3Hit,
  level3Complete,
  level3Intro,
  level3Dialog,
  level4Pickup,
  level4Complete,
  level4Intro,
  randomFrom,
} from '../data/dialogs';
import { drawPlayer, drawBgHeart, drawCloud, DRAW_ITEM, DRAW_OBSTACLE } from './PixelRenderer';
import { isNightMode, generateClouds, updateClouds } from './NightClouds';
import useControls from '../hooks/useControls';
import DialogBox from './DialogBox';
import FloatingDialog from './FloatingDialog';
import HUD from './HUD';
import MobileControls from './MobileControls';
import './GameEngine.css';

// ── Dialog maps per level ────────────────────────────────────
const DIALOGS = {
  1: { intro: level1Intro, pickup: level1Pickup, hit: level1Hit, complete: level1Complete },
  2: { intro: level2Intro, pickup: level2Pickup, hit: level2Hit, complete: level2Complete },
  3: { intro: level3Intro, pickup: level3Pickup, hit: level3Hit, complete: level3Complete, walk: level3Dialog },
  4: { intro: level4Intro, pickup: level4Pickup, hit: [], complete: level4Complete },
};

const MIXED_ITEMS = ['flower', 'chocolate', 'letter'];

// ── Pause duration for collision dialog (ms) ─────────────────
const COLLISION_PAUSE_MS = 1600;

// ── Helpers ──────────────────────────────────────────────────
const rectsOverlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

const uid = (() => {
  let i = 0;
  return () => ++i;
})();

export default function GameEngine({ levelIndex, onComplete, onGameOver }) {
  const level = LEVELS[levelIndex];
  const canvasRef = useRef(null);
  const { keys, addKey, removeKey } = useControls();

  // Game state refs (for animation loop)
  const stateRef = useRef({
    player: { x: CANVAS_W / 2 - PLAYER_SIZE / 2, y: CANVAS_H - PLAYER_SIZE - 40 },
    items: [],
    obstacles: [],
    score: 0,
    lives: 3,
    timeLeft: level.duration,
    frame: 0,
    bgHearts: Array.from({ length: 8 }, () => ({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      size: 10 + Math.random() * 18,
      speed: 0.2 + Math.random() * 0.4,
      alpha: 0.06 + Math.random() * 0.1,
    })),
    nightClouds: isNightMode(level.bgColor) ? generateClouds(CANVAS_W, CANVAS_H, 5) : [],
    running: true,
    paused: false, // true while collision dialog is showing
    dialogCooldown: 0,
    walkDialogTimer: 0,
  });

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(level.duration);
  const [phase, setPhase] = useState('intro'); // intro | play | complete | fail
  const [introIdx, setIntroIdx] = useState(0);

  // Dialog state
  const [dialog, setDialog] = useState(''); // normal (bottom) dialog
  const [collisionDialog, setCollisionDialog] = useState(''); // collision (floating) dialog
  // Player position in React state (for FloatingDialog positioning)
  const [playerPos, setPlayerPos] = useState({ x: CANVAS_W / 2, y: CANVAS_H - PLAYER_SIZE - 40 });

  // ── Intro dialog queue ──────────────────────────────────────
  const introLines = DIALOGS[level.id]?.intro || [];

  const advanceIntro = useCallback(() => {
    if (introIdx + 1 < introLines.length) {
      setIntroIdx((i) => i + 1);
    } else {
      setPhase('play');
      setDialog('');
    }
  }, [introIdx, introLines.length]);

  // ── Collision dialog trigger ────────────────────────────────
  const triggerCollisionDialog = useCallback((text) => {
    const s = stateRef.current;
    s.paused = true;
    // Snapshot player position for the floating speech bubble
    setPlayerPos({ x: s.player.x, y: s.player.y });
    setCollisionDialog(text);

    // Auto-resume after pause
    setTimeout(() => {
      s.paused = false;
      setCollisionDialog('');
    }, COLLISION_PAUSE_MS);
  }, []);

  // ── Spawn items ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'play') return;
    const iv = setInterval(() => {
      const s = stateRef.current;
      if (!s.running || s.paused) return;

      let type = level.itemType;
      if (type === 'mixed') type = MIXED_ITEMS[Math.floor(Math.random() * MIXED_ITEMS.length)];
      if (type === 'star' && Math.random() < 0.25) type = 'lantern';

      s.items.push({
        id: uid(),
        type,
        x: Math.random() * (CANVAS_W - ITEM_SIZE),
        y: -ITEM_SIZE,
        w: ITEM_SIZE,
        h: ITEM_SIZE,
        speed: 1 + Math.random() * 1.2,
      });
    }, level.spawnRate);
    return () => clearInterval(iv);
  }, [phase, level]);

  // ── Spawn obstacles ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'play') return;
    const iv = setInterval(() => {
      const s = stateRef.current;
      if (!s.running || s.paused) return;
      s.obstacles.push({
        id: uid(),
        type: level.obstacleType,
        x: Math.random() * (CANVAS_W - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE,
        w: OBSTACLE_SIZE,
        h: OBSTACLE_SIZE,
        speed: 1.2 + Math.random() * 1,
      });
    }, level.obstacleRate);
    return () => clearInterval(iv);
  }, [phase, level]);

  // ── Timer ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'play') return;
    const iv = setInterval(() => {
      const s = stateRef.current;
      if (!s.running || s.paused) return;
      s.timeLeft -= 1;
      setTimeLeft(s.timeLeft);
      if (s.timeLeft <= 0) {
        s.running = false;
        if (s.score >= level.targetScore) {
          setPhase('complete');
        } else {
          setPhase('fail');
        }
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, level]);

  // ── Main game loop (canvas) ─────────────────────────────────
  useEffect(() => {
    if (phase !== 'play') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const loop = () => {
      const s = stateRef.current;

      // Always render even when paused, but skip logic updates
      if (!s.running && !s.paused) {
        raf = requestAnimationFrame(loop);
        return;
      }

      s.frame += 1;

      // ── Update logic (only when not paused) ──────
      if (!s.paused && s.running) {
        const p = s.player;
        if (keys.has('left') && p.x > 0) p.x -= PLAYER_SPEED;
        if (keys.has('right') && p.x < CANVAS_W - PLAYER_SIZE) p.x += PLAYER_SPEED;
        if (keys.has('up') && p.y > 30) p.y -= PLAYER_SPEED;
        if (keys.has('down') && p.y < CANVAS_H - PLAYER_SIZE) p.y += PLAYER_SPEED;

        // Items fall
        s.items.forEach((it) => {
          it.y += it.speed;
        });
        s.items = s.items.filter((it) => it.y < CANVAS_H + 20);

        // Obstacles fall
        s.obstacles.forEach((ob) => {
          ob.y += ob.speed;
        });
        s.obstacles = s.obstacles.filter((ob) => ob.y < CANVAS_H + 20);

        // Collisions: items
        const playerRect = { x: p.x, y: p.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
        s.items = s.items.filter((it) => {
          if (rectsOverlap(playerRect, it)) {
            s.score += 1;
            setScore(s.score);

            // Trigger collision dialog (one per collision, respects cooldown)
            if (s.dialogCooldown <= 0) {
              const pickups = DIALOGS[level.id]?.pickup || [];
              if (pickups.length) {
                triggerCollisionDialog(randomFrom(pickups));
                s.dialogCooldown = 120; // frames cooldown before next dialog
              }
            }

            // Check win condition
            if (s.score >= level.targetScore) {
              s.running = false;
              setPhase('complete');
            }
            return false;
          }
          return true;
        });

        // Collisions: obstacles
        s.obstacles = s.obstacles.filter((ob) => {
          if (rectsOverlap(playerRect, ob)) {
            s.lives -= 1;
            setLives(s.lives);

            if (s.dialogCooldown <= 0) {
              const hits = DIALOGS[level.id]?.hit || [];
              if (hits.length) {
                triggerCollisionDialog(randomFrom(hits));
                s.dialogCooldown = 120;
              }
            }

            if (s.lives <= 0) {
              s.running = false;
              setPhase('fail');
            }
            return false;
          }
          return true;
        });

        if (s.dialogCooldown > 0) s.dialogCooldown -= 1;

        // Level 3+ random walk dialog (use floating speech bubble for consistency)
        if (level.id >= 3) {
          s.walkDialogTimer += 1;
          if (s.walkDialogTimer > 420 && s.dialogCooldown <= 0) {
            triggerCollisionDialog(randomFrom(level3Dialog));
            s.dialogCooldown = 180;
            s.walkDialogTimer = 0;
          }
        }
      }

      // ── BG hearts (always animate, even paused) ──
      const s2 = stateRef.current;
      s2.bgHearts.forEach((h) => {
        h.y -= h.speed;
        if (h.y < -30) {
          h.y = CANVAS_H + 10;
          h.x = Math.random() * CANVAS_W;
        }
      });

      // ── Night clouds parallax (always animate) ──
      if (s2.nightClouds.length > 0) {
        updateClouds(s2.nightClouds, CANVAS_W);
      }

      // ═══════════════ RENDER ═══════════════
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Background
      ctx.fillStyle = level.bgColor;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // BG hearts
      s2.bgHearts.forEach((h) => drawBgHeart(ctx, h.x, h.y, h.size, h.alpha));

      // Night clouds (render behind items/player, sorted by depth)
      if (s2.nightClouds.length > 0) {
        s2.nightClouds.forEach((cloud) => {
          drawCloud(ctx, cloud.x, cloud.y, cloud.size, cloud.alpha, cloud.glow);
        });
      }

      // Ground decoration
      if (level.id <= 2) {
        ctx.fillStyle = 'rgba(232,67,147,0.08)';
        ctx.fillRect(0, CANVAS_H - 30, CANVAS_W, 30);
      }

      // Items
      const pulse = s2.frame * 0.08;
      s2.items.forEach((it) => {
        const drawFn = DRAW_ITEM[it.type] || DRAW_ITEM.heart;
        drawFn(ctx, it.x, it.y, it.w, pulse);
      });

      // Obstacles
      s2.obstacles.forEach((ob) => {
        const drawFn = DRAW_OBSTACLE[ob.type] || DRAW_OBSTACLE.alarm;
        drawFn(ctx, ob.x, ob.y, ob.w, pulse);
      });

      // Player
      drawPlayer(ctx, s2.player.x, s2.player.y, PLAYER_SIZE, s2.frame);

      // Pause overlay (subtle dim)
      if (s2.paused) {
        ctx.fillStyle = 'rgba(255, 240, 245, 0.15)';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, keys, level, triggerCollisionDialog]);

  // ── Phase handlers ──────────────────────────────────────────
  const handleComplete = () => {
    saveProgress(levelIndex + 1);
    onComplete();
  };

  const handleRetry = () => {
    const s = stateRef.current;
    s.player = { x: CANVAS_W / 2 - PLAYER_SIZE / 2, y: CANVAS_H - PLAYER_SIZE - 40 };
    s.items = [];
    s.obstacles = [];
    s.score = 0;
    s.lives = 3;
    s.timeLeft = level.duration;
    s.frame = 0;
    s.nightClouds = isNightMode(level.bgColor) ? generateClouds(CANVAS_W, CANVAS_H, 5) : [];
    s.running = true;
    s.paused = false;
    s.dialogCooldown = 0;
    s.walkDialogTimer = 0;
    setScore(0);
    setLives(3);
    setTimeLeft(level.duration);
    setDialog('');
    setCollisionDialog('');
    setPhase('intro');
    setIntroIdx(0);
  };

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <div className="game-engine" style={{ background: level.bgColor }}>
      <div className="game-canvas-wrapper">
        {/* Intro phase */}
        {phase === 'intro' && (
          <div className="game-overlay">
            <div className="level-intro">
              <h2 className="pixel-text level-title">Level {level.id}</h2>
              <h3 className="pixel-text level-name">{level.name}</h3>
              <p className="level-subtitle">{level.subtitle}</p>
            </div>
            <DialogBox text={introLines[introIdx]} onDone={advanceIntro} speed={30} />
          </div>
        )}

        {/* Play phase */}
        {phase === 'play' && (
          <>
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="game-canvas" />
            <HUD score={score} targetScore={level.targetScore} timeLeft={timeLeft} levelName={level.name} lives={lives} />

            {/* Collision dialog – floating speech bubble above player */}
            {collisionDialog && (
              <FloatingDialog
                text={collisionDialog}
                playerX={playerPos.x + PLAYER_SIZE / 2}
                playerY={playerPos.y}
                canvasW={CANVAS_W}
                canvasH={CANVAS_H}
                speed={18}
                autoDismiss={COLLISION_PAUSE_MS - 200}
                onDone={() => setCollisionDialog('')}
              />
            )}
          </>
        )}

        {/* Complete phase */}
        {phase === 'complete' && (
          <div className="game-overlay">
            <div className="result-panel pixel-border">
              <h2 className="pixel-text">✨ Level Selesai! ✨</h2>
              <DialogBox text={DIALOGS[level.id]?.complete?.[0] || 'Luar biasa, Silvia!'} speed={30} onDone={handleComplete} />
            </div>
          </div>
        )}

        {/* Fail phase */}
        {phase === 'fail' && (
          <div className="game-overlay">
            <div className="result-panel pixel-border">
              <h2 className="pixel-text">Aduh, Silvia! 💔</h2>
              <p style={{ color: '#636e72', marginBottom: 12 }}>Jangan menyerah — coba lagi!</p>
              <button className="pixel-btn" onClick={handleRetry}>
                Coba Lagi 💪
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile controls – OUTSIDE wrapper to avoid overflow:hidden clipping */}
      {phase === 'play' && <MobileControls addKey={addKey} removeKey={removeKey} />}
    </div>
  );
}
