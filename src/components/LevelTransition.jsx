import React from 'react';
import './LevelTransition.css';

/**
 * Brief transition screen between levels.
 */
export default function LevelTransition({ levelNum, levelName, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="level-transition">
      <div className="transition-content">
        <span className="transition-icon">🌸</span>
        <h2 className="pixel-text transition-title">Level {levelNum}</h2>
        <p className="transition-name">{levelName}</p>
        <div className="transition-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}
