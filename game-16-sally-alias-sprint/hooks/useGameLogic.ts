import { useState, useCallback, useEffect, useRef } from 'react';
import { CARD_DATA } from '../data/cards';

export function useGameLogic() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = useCallback(() => {
    setIsActive(true);
    setIsFinished(false);
    setScore(0);
    setTimeLeft(60);
    setCurrentIdx(Math.floor(Math.random() * CARD_DATA.length));
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const correct = useCallback(() => {
    setScore(prev => prev + 1);
    setCurrentIdx(Math.floor(Math.random() * CARD_DATA.length));
  }, []);

  const skip = useCallback(() => {
    setScore(prev => prev - 1);
    setCurrentIdx(Math.floor(Math.random() * CARD_DATA.length));
  }, []);

  return {
    currentCard: CARD_DATA[currentIdx],
    score,
    timeLeft,
    isActive,
    isFinished,
    startRound,
    correct,
    skip,
  };
}
