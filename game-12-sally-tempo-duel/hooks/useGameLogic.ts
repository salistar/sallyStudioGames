import { useState, useRef, useEffect, useCallback } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [bpm, setBpm] = useState(60);
  const [lastBeat, setLastBeat] = useState(Date.now());
  const [isBeat, setIsBeat] = useState(false);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setBpm(60);
    setLastBeat(Date.now());
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
    setBpm(b => b + 5);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    
    const interval = 60000 / bpm;
    const timer = setInterval(() => {
      setLastBeat(Date.now());
      setIsBeat(true);
      setTimeout(() => setIsBeat(false), 100);
    }, interval);
    
    return () => clearInterval(timer);
  }, [phase, bpm]);

  return { phase, level, bpm, lastBeat, isBeat, start, end, nextLevel };
}
