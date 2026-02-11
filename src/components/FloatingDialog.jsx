import React, { useEffect, useState } from 'react';
import useTypewriter from '../hooks/useTypewriter';
import './FloatingDialog.css';

/**
 * FloatingDialog – speech bubble that tracks the player position.
 *
 * Props:
 *  text        – string to display
 *  playerX     – player x in canvas coords (0–480)
 *  playerY     – player y in canvas coords (0–360)
 *  canvasW     – canvas logical width (480)
 *  canvasH     – canvas logical height (360)
 *  speed       – typewriter speed (ms per char)
 *  autoDismiss – auto-dismiss after N ms (0 = never)
 *  onDone      – callback when dismissed
 */
export default function FloatingDialog({ text, playerX = 0, playerY = 0, canvasW = 480, canvasH = 360, speed = 18, autoDismiss = 1600, onDone }) {
  const { displayText } = useTypewriter(text, speed, 0);
  const [visible, setVisible] = useState(false);

  // Fade in
  useEffect(() => {
    if (!text) {
      setVisible(false);
      return;
    }
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [text]);

  // Auto dismiss
  useEffect(() => {
    if (!autoDismiss || !text) return;
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDone?.(), 250);
    }, autoDismiss);
    return () => clearTimeout(t);
  }, [autoDismiss, text, onDone]);

  if (!text) return null;

  // Convert canvas coords → percentage positions within the wrapper
  const leftPct = Math.min(Math.max((playerX / canvasW) * 100, 12), 88);
  const bottomPct = Math.min(Math.max(((canvasH - playerY) / canvasH) * 100 + 8, 30), 85);

  return (
    <div
      className={`floating-dialog ${visible ? 'floating-dialog--show' : ''}`}
      style={{
        left: `${leftPct}%`,
        bottom: `${bottomPct}%`,
      }}
    >
      <div className="floating-bubble">
        <p className="floating-text">{displayText}</p>
      </div>
    </div>
  );
}
