import { useState, useRef, useEffect, useCallback } from 'react';

type ChallengeType = 'tap' | 'hold' | 'wait' | 'dont_touch';

interface Challenge {
  type: ChallengeType;
  instructions: string;
  target?: number; // count for tap, seconds for hold/wait
}

const CHALLENGES: Challenge[] = [
  { type: 'tap', instructions: 'Appuie 5 fois vite !', target: 5 },
  { type: 'wait', instructions: 'Attends 3 secondes...', target: 3 },
  { type: 'dont_touch', instructions: 'NE TOUCHE À RIEN !', target: 2 },
  { type: 'hold', instructions: 'Maintiens 2 secondes pile', target: 2 },
  { type: 'tap', instructions: 'Appuie 3 fois', target: 3 },
  { type: 'wait', instructions: 'Patience... (4s)', target: 4 },
];

export function useGameLogic() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [level, setLevel] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextLevel = useCallback(() => {
    const nextIdx = Math.floor(Math.random() * CHALLENGES.length);
    setCurrentChallenge(CHALLENGES[nextIdx]);
    setLevel(l => l + 1);
    setProgress(0);
    setTimer(0);
  }, []);

  const start = useCallback(() => {
    setPhase('playing');
    setLevel(0);
    nextLevel();
  }, [nextLevel]);

  const end = useCallback(() => {
    setPhase('gameover');
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleAction = useCallback((type: 'press' | 'release' | 'tick') => {
    if (phase !== 'playing' || !currentChallenge) return;

    if (type === 'press') {
      if (currentChallenge.type === 'tap') {
        const next = progress + 1;
        if (next >= (currentChallenge.target || 1)) nextLevel();
        else setProgress(next);
      } else if (currentChallenge.type === 'dont_touch') {
        end();
      }
    }
  }, [phase, currentChallenge, progress, nextLevel, end]);

  useEffect(() => {
    if (phase === 'playing' && currentChallenge) {
      const interval = setInterval(() => {
        setTimer(t => {
          const next = t + 0.1;
          if (currentChallenge.type === 'wait' || currentChallenge.type === 'dont_touch') {
            if (next >= (currentChallenge.target || 0)) {
              nextLevel();
              return 0;
            }
          }
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [phase, currentChallenge, nextLevel]);

  return { phase, level, currentChallenge, timer, progress, start, end, handleAction };
}
