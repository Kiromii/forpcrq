import React, { useState, useEffect, useRef } from 'react';
import { confessionLines } from '../data/dialogs';
import { clearProgress } from '../data/constants';
import useTypewriter from '../hooks/useTypewriter';
import './EndingScreen.css';

function ConfessionLine({ text, delay, onDone }) {
  const { displayText, isTyping } = useTypewriter(text, 40, delay);

  useEffect(() => {
    if (!isTyping && displayText === text && onDone) {
      const t = setTimeout(onDone, 1200);
      return () => clearTimeout(t);
    }
  }, [isTyping, displayText, text, onDone]);

  return (
    <p className={`confession-line ${displayText === text ? 'done' : ''}`}>
      {displayText}
      {isTyping && <span className="cursor">|</span>}
    </p>
  );
}

export default function EndingScreen({ onRestart }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const containerRef = useRef(null);

  const advance = () => {
    if (currentLine + 1 < confessionLines.length) {
      setCurrentLine((i) => i + 1);
    } else {
      setShowFinal(true);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLine, showFinal]);

  const handleRestart = () => {
    clearProgress();
    onRestart();
  };

  // Floating particles
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.2,
    })),
  );

  return (
    <div className="ending-screen">
      {/* Floating particles */}
      <div className="ending-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ending-particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="ending-content" ref={containerRef}>
        <div className="ending-heart-big">💖</div>
        <h2 className="pixel-text ending-title">Untukmu, Pacar Akuu Silvia</h2>

        <div className="confession-container">
          {Array.from({ length: currentLine + 1 }, (_, i) => (
            <ConfessionLine key={i} text={confessionLines[i]} delay={i === currentLine ? 600 : 0} onDone={i === currentLine ? advance : undefined} />
          ))}
        </div>

        {showFinal && (
          <div className="ending-final">
            <div className="ending-hearts-row">💕 💗 💖 💗 💕</div>
            <p className="ending-note">Semoga suka ya sama gamenya, maaf kalo masih banyak banget kurangnya sayangku</p>
            <button className="pixel-btn primary" onClick={handleRestart}>
              Main Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
