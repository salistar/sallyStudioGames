import { useState, useCallback } from 'react';
import { CONFIG } from '../constants/config';

export function useGameLogic() {
  const [target, setTarget] = useState(CONFIG.WORDS[Math.floor(Math.random() * CONFIG.WORDS.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const start = useCallback(() => {
    setTarget(CONFIG.WORDS[Math.floor(Math.random() * CONFIG.WORDS.length)]);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  }, []);

  const submit = useCallback(() => {
    if (currentGuess.length !== 5 || gameOver) return;
    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess('');
    if (currentGuess.toUpperCase() === target || newGuesses.length >= 6) {
      setGameOver(true);
    }
  }, [currentGuess, guesses, target, gameOver]);

  return { target, guesses, currentGuess, setCurrentGuess, gameOver, submit, start };
}
