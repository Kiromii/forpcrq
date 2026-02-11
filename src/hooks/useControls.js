import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard + touch controls.
 * Returns a Set of currently pressed directions: 'left','right','up','down'
 */
export default function useControls() {
  const [keys, setKeys] = useState(new Set());

  const addKey = useCallback((dir) => {
    setKeys((prev) => {
      const next = new Set(prev);
      next.add(dir);
      return next;
    });
  }, []);

  const removeKey = useCallback((dir) => {
    setKeys((prev) => {
      const next = new Set(prev);
      next.delete(dir);
      return next;
    });
  }, []);

  useEffect(() => {
    const map = {
      ArrowLeft: 'left',
      a: 'left',
      A: 'left',
      ArrowRight: 'right',
      d: 'right',
      D: 'right',
      ArrowUp: 'up',
      w: 'up',
      W: 'up',
      ArrowDown: 'down',
      s: 'down',
      S: 'down',
    };

    const handleDown = (e) => {
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        addKey(dir);
      }
    };

    const handleUp = (e) => {
      const dir = map[e.key];
      if (dir) removeKey(dir);
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [addKey, removeKey]);

  return { keys, addKey, removeKey };
}
