import { useState, useCallback, useEffect } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

const EMOJIS = ['😀', '🚀', '🐱', '🍕', '🎉', '🌟', '🦄', '🍎', '🚗', '🎸', '🍦', '🌈', '🏰', '🤖', '🦖'];

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const [timer, setTimer] = useState(20);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setTimer(20);
    generateEmojis();
  }, []);

  const generateEmojis = useCallback(() => {
    const shuffled = [...EMOJIS].sort(() => 0.5 - Math.random());
    setCurrentEmojis(shuffled.slice(0, 5));
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
    setTimer(20);
    generateEmojis();
  }, [generateEmojis]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timer <= 0) {
      end();
      return;
    }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timer, end]);

  return { phase, level, currentEmojis, timer, start, end, nextLevel };
}
