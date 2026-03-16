import { useState, useCallback, useEffect } from 'react';
import { CONSTELLATIONS, Constellation } from '../constants/constellations';

export function useGameLogic() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [connectedStars, setConnectedStars] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const current = CONSTELLATIONS[currentIdx];

  const handleStarPress = useCallback((starId: number) => {
    if (isComplete) return;

    setConnectedStars(prev => {
      if (prev.includes(starId)) return prev;
      const next = [...prev, starId];
      if (next.length === current.stars.length) {
        setIsComplete(true);
      }
      return next;
    });
  }, [current, isComplete]);

  const nextConstellation = useCallback(() => {
    if (currentIdx < CONSTELLATIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setConnectedStars([]);
      setIsComplete(false);
      setScore(prev => prev + 100);
    } else {
      // Fin du jeu
    }
  }, [currentIdx]);

  return {
    current,
    connectedStars,
    isComplete,
    score,
    handleStarPress,
    nextConstellation,
  };
}
