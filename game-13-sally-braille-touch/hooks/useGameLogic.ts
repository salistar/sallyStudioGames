import { useState, useCallback } from 'react';
import { CONFIG } from '../constants/config';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [targetChar, setTargetChar] = useState('A');
  const [userPattern, setUserPattern] = useState([0, 0, 0, 0, 0, 0]);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    pickNewChar();
  }, []);

  const pickNewChar = useCallback(() => {
    const chars = Object.keys(CONFIG.BRAILLE);
    setTargetChar(chars[Math.floor(Math.random() * chars.length)]);
    setUserPattern([0, 0, 0, 0, 0, 0]);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const toggleDot = useCallback((index: number) => {
    setUserPattern(prev => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  }, []);

  return { phase, level, targetChar, userPattern, start, end, pickNewChar, toggleDot };
}
