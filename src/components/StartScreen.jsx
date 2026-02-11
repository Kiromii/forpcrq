import React, { useState, useEffect, useRef } from 'react';
import { startScreenDialogs, randomFrom } from '../data/dialogs';
import { loadProgress, clearProgress } from '../data/constants';
import './StartScreen.css';

export default function StartScreen({ onStart, onContinue }) {
  const [subtitle, setSubtitle] = useState('');
  const [hearts, setHearts] = useState([]);
  const saved = loadProgress();
  const frameRef = useRef(0);
  const canvasRef = useRef(null);

  // Cycle subtitle dialogs
  useEffect(() => {
    setSubtitle(randomFrom(startScreenDialogs));
    const iv = setInterval(() => setSubtitle(randomFrom(startScreenDialogs)), 5000);
    return () => clearInterval(iv);
  }, []);

  // Floating hearts animation
  useEffect(() => {
    const h = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      speed: 0.15 + Math.random() * 0.35,
      opacity: 0.1 + Math.random() * 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    }));
    setHearts(h);
  }, []);

  // Animate hearts on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const w = 480,
      hh = 600;
    canvas.width = w;
    canvas.height = hh;

    const draw = () => {
      frameRef.current += 1;
      ctx.clearRect(0, 0, w, hh);

      hearts.forEach((h) => {
        h.y -= h.speed * 0.2;
        h.x += h.drift * 0.1;
        if (h.y < -5) {
          h.y = 105;
          h.x = Math.random() * 100;
        }

        const px = (h.x / 100) * w;
        const py = (h.y / 100) * hh;
        const s = h.size;
        ctx.fillStyle = `rgba(232, 67, 147, ${h.opacity})`;
        ctx.fillRect(px, py, s * 0.4, s * 0.3);
        ctx.fillRect(px + s * 0.5, py, s * 0.4, s * 0.3);
        ctx.fillRect(px - s * 0.05, py + s * 0.2, s * 1.0, s * 0.3);
        ctx.fillRect(px + s * 0.1, py + s * 0.45, s * 0.7, s * 0.25);
        ctx.fillRect(px + s * 0.25, py + s * 0.65, s * 0.4, s * 0.15);
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [hearts]);

  return (
    <div className="start-screen">
      <canvas ref={canvasRef} className="start-canvas" />
      <div className="start-content">
        <div className="start-logo">
          <span className="logo-heart">💕</span>
          <h1 className="pixel-text start-title">Valentine Quest</h1>
          <h2 className="start-sub-title">Satu Hari Bersama Silvia</h2>
        </div>
        <p className="start-subtitle">{subtitle}</p>
        <div className="start-buttons">
          <button className="pixel-btn primary" onClick={() => onStart(0)}>
            Mulai Baru
          </button>
          {saved > 0 && (
            <button className="pixel-btn" onClick={() => onContinue(saved)}>
              Lanjutkan (Level {saved + 1}) ▶
            </button>
          )}
          {saved > 0 && (
            <button
              className="pixel-btn small"
              onClick={() => {
                clearProgress();
                window.location.reload();
              }}
            >
              Hapus Progres
            </button>
          )}
        </div>
        <p className="start-controls">Tombol panah / WASD untuk bergerak &nbsp;|&nbsp; Ketuk tombol di HP</p>
      </div>
    </div>
  );
}
