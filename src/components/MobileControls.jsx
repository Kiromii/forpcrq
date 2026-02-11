import React, { useRef, useCallback, useEffect, useState } from 'react';
import './MobileControls.css';

/**
 * Mobile touch controls — L/R/U/D buttons, fixed at bottom.
 * Uses a continuous resize listener to show only when width <= 768.
 * Holding a button pumps addKey every frame for smooth movement.
 */
export default function MobileControls({ addKey, removeKey }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const activeRef = useRef({});

  // ── Continuous resize listener (NOT one-shot) ──────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  // ── Smooth hold: pump addKey every frame while pressed ─────
  const startHold = useCallback(
    (dir) => {
      if (activeRef.current[dir]) return;
      addKey(dir);
      const pump = () => {
        addKey(dir);
        activeRef.current[dir] = requestAnimationFrame(pump);
      };
      activeRef.current[dir] = requestAnimationFrame(pump);
    },
    [addKey],
  );

  const stopHold = useCallback(
    (dir) => {
      if (activeRef.current[dir]) {
        cancelAnimationFrame(activeRef.current[dir]);
        delete activeRef.current[dir];
      }
      removeKey(dir);
    },
    [removeKey],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.keys(activeRef.current).forEach((d) => {
        cancelAnimationFrame(activeRef.current[d]);
      });
    };
  }, []);

  const bind = (dir) => ({
    onTouchStart: (e) => {
      e.preventDefault();
      startHold(dir);
    },
    onTouchEnd: (e) => {
      e.preventDefault();
      stopHold(dir);
    },
    onTouchCancel: (e) => {
      e.preventDefault();
      stopHold(dir);
    },
    onMouseDown: () => startHold(dir),
    onMouseUp: () => stopHold(dir),
    onMouseLeave: () => stopHold(dir),
    onContextMenu: (e) => e.preventDefault(),
  });

  if (!isMobile) return null;

  return (
    <div className="mobile-controls" role="group" aria-label="Game controls">
      <div className="mc-side mc-left">
        <button className="mc-btn" {...bind('up')} aria-label="Up">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
          </svg>
        </button>
        <div className="mc-btn-row">
          <button className="mc-btn" {...bind('left')} aria-label="Left">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 12l8-8v5h8v6h-8v5z" />
            </svg>
          </button>
          <button className="mc-btn" {...bind('down')} aria-label="Down">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20l8-8h-5V4h-6v8H4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mc-side mc-right">
        <button className="mc-btn mc-btn-big" {...bind('right')} aria-label="Right">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 12l-8-8v5H4v6h8v5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
