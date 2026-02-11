import React, { useEffect, useState } from 'react';
import useTypewriter from '../hooks/useTypewriter';
import './DialogBox.css';

/**
 * Pastel-themed dialog box with typewriter effect + fade-in.
 *
 * Props:
 *  text     – string to display
 *  speed    – ms per character
 *  delay    – ms before typing starts
 *  onDone   – called when user taps after typing finishes
 *  visible  – render at all?
 *  variant  – 'default' | 'collision'  (collision = floats above player, auto-dismiss)
 *  autoDismiss – ms to auto-dismiss (0 = manual dismiss only)
 */
export default function DialogBox({ text, speed = 35, delay = 0, onDone, visible = true, variant = 'default', autoDismiss = 0 }) {
  const { displayText, isTyping, skip } = useTypewriter(text, speed, delay);
  const [show, setShow] = useState(false);

  // Fade-in on mount / text change
  useEffect(() => {
    if (!text || !visible) {
      setShow(false);
      return;
    }
    // Tiny delay so CSS transition triggers
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, [text, visible]);

  // Auto-dismiss for collision dialogs
  useEffect(() => {
    if (!autoDismiss || !text) return;
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onDone?.(), 250); // wait for fade-out
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, text, onDone]);

  if (!visible || !text) return null;

  const handleClick = () => {
    if (autoDismiss) return; // collision dialogs dismiss themselves
    if (isTyping) {
      skip();
    } else if (onDone) {
      setShow(false);
      setTimeout(() => onDone(), 200);
    }
  };

  const cls = ['dialog-box', show ? 'dialog-box--visible' : '', variant === 'collision' ? 'dialog-box--collision' : ''].filter(Boolean).join(' ');

  return (
    <div className={cls} onClick={handleClick}>
      <div className="dialog-bubble">
        <p className="dialog-text">{displayText}</p>
        {!isTyping && !autoDismiss && <span className="dialog-continue">▼ ketuk untuk lanjut</span>}
      </div>
    </div>
  );
}
