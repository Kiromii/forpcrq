import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameEngine from './components/GameEngine';
import LevelTransition from './components/LevelTransition';
import EndingScreen from './components/EndingScreen';
import { LEVELS } from './data/constants';
import './App.css';

/**
 * Main App – orchestrates game screens and level progression.
 *
 * Screens: start → transition → play → transition → ... → ending
 */
export default function App() {
  const [screen, setScreen] = useState('start');
  const [levelIndex, setLevelIndex] = useState(0);

  const startGame = useCallback((fromLevel = 0) => {
    setLevelIndex(fromLevel);
    setScreen('transition');
  }, []);

  const onTransitionDone = useCallback(() => {
    setScreen('play');
  }, []);

  const onLevelComplete = useCallback(() => {
    const next = levelIndex + 1;
    if (next >= LEVELS.length) {
      setScreen('ending');
    } else {
      setLevelIndex(next);
      setScreen('transition');
    }
  }, [levelIndex]);

  const onGameOver = useCallback(() => {
    setScreen('start');
  }, []);

  const onRestart = useCallback(() => {
    setLevelIndex(0);
    setScreen('start');
  }, []);

  return (
    <div className="app">
      {screen === 'start' && <StartScreen onStart={startGame} onContinue={startGame} />}
      {screen === 'transition' && <LevelTransition levelNum={LEVELS[levelIndex].id} levelName={LEVELS[levelIndex].name} onDone={onTransitionDone} />}
      {screen === 'play' && <GameEngine key={levelIndex} levelIndex={levelIndex} onComplete={onLevelComplete} onGameOver={onGameOver} />}
      {screen === 'ending' && <EndingScreen onRestart={onRestart} />}
    </div>
  );
}
