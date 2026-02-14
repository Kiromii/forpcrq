import React, { useState, useCallback, useRef, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameEngine from './components/GameEngine';
import LevelTransition from './components/LevelTransition';
import EndingScreen from './components/EndingScreen';
import { LEVELS } from './data/constants';
import './App.css';

// Background music URL - Ganti dengan file musik Anda sendiri
const MUSIC_URL = '/Musik.mp3';

/**
 * Main App – orchestrates game screens and level progression.
 *
 * Screens: start → transition → play → transition → ... → ending
 */
export default function App() {
  const [screen, setScreen] = useState('start');
  const [levelIndex, setLevelIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicInitialized, setMusicInitialized] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio on first user interaction
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
  }, []);

  // Handle music play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying]);

  const toggleMusic = useCallback(() => {
    setMusicPlaying((prev) => !prev);
  }, []);

  const startGame = useCallback(
    (fromLevel = 0) => {
      setLevelIndex(fromLevel);
      setScreen('transition');
      // Auto-play music when game starts (if not already playing)
      if (!musicInitialized) {
        setMusicPlaying(true);
        setMusicInitialized(true);
      }
    },
    [musicInitialized],
  );

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
      {/* Music Toggle Button */}
      <button className="music-toggle" onClick={toggleMusic} title={musicPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}>
        {musicPlaying ? '🎵' : '🔇'}
      </button>

      {screen === 'start' && <StartScreen onStart={startGame} onContinue={startGame} />}
      {screen === 'transition' && <LevelTransition levelNum={LEVELS[levelIndex].id} levelName={LEVELS[levelIndex].name} onDone={onTransitionDone} />}
      {screen === 'play' && <GameEngine key={levelIndex} levelIndex={levelIndex} onComplete={onLevelComplete} onGameOver={onGameOver} />}
      {screen === 'ending' && <EndingScreen onRestart={onRestart} />}
    </div>
  );
}
