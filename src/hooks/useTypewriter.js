import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Typewriter text effect hook.
 * Returns { displayText, isTyping, skip }
 */
export default function useTypewriter(fullText, speed = 40, delay = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(delayRef.current);
    indexRef.current = 0;
    setDisplayText('');
    setIsTyping(false);
  }, []);

  useEffect(() => {
    reset();
    if (!fullText) return;

    delayRef.current = setTimeout(() => {
      setIsTyping(true);
      timerRef.current = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current >= fullText.length) {
          clearInterval(timerRef.current);
          setIsTyping(false);
          setDisplayText(fullText);
        } else {
          setDisplayText(fullText.slice(0, indexRef.current + 1));
        }
      }, speed);
    }, delay);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(delayRef.current);
    };
  }, [fullText, speed, delay, reset]);

  const skip = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(delayRef.current);
    indexRef.current = fullText?.length || 0;
    setDisplayText(fullText || '');
    setIsTyping(false);
  }, [fullText]);

  return { displayText, isTyping, skip };
}
