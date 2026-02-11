import React from 'react';
import './HUD.css';

/**
 * Heads-up display: score, timer, level info
 */
export default function HUD({ score, targetScore, timeLeft, levelName, lives }) {
  return (
    <div className="hud pixel-border">
      <span className="hud-item">
        💕 {score}/{targetScore}
      </span>
      <span className="hud-item hud-level">{levelName}</span>
      <span className="hud-item">⏱ {timeLeft}s</span>
      <span className="hud-item">❤️ {'♥'.repeat(Math.max(lives, 0))}</span>
    </div>
  );
}
