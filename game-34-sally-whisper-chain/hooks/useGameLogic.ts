import { useState, useCallback } from 'react';
import * as Speech from 'expo-speech';

export function useGameLogic() {
  const [story, setStory] = useState<string[]>([]);
  const [phase, setPhase] = useState<'setup' | 'playing' | 'end'>('setup');
  const [playerCount, setPlayerCount] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const start = useCallback((count: number) => {
    setPlayerCount(count);
    setStory([]);
    setCurrentPlayer(0);
    setPhase('playing');
  }, []);

  const addPhrase = useCallback((phrase: string) => {
    setStory(prev => [...prev, phrase]);
    if (currentPlayer + 1 >= playerCount) {
      setPhase('end');
    } else {
      setCurrentPlayer(curr => curr + 1);
    }
  }, [currentPlayer, playerCount]);

  const readStory = useCallback(() => {
    Speech.speak(story.join('. '), { language: 'fr' });
  }, [story]);

  return { story, phase, playerCount, currentPlayer, start, addPhrase, readStory };
}
