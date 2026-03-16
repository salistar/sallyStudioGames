import { useState, useCallback, useEffect } from 'react';

type Phase = 'idle' | 'playing' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [target, setTarget] = useState('Apple');
  const [blur, setBlur] = useState(20);
  
  const start = useCallback(() => {
    setPhase('playing');
    setBlur(20);
    setTarget('Apple');
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (blur <= 0) return;
    const id = setInterval(() => setBlur(b => Math.max(0, b - 1)), 1000);
    return () => clearInterval(id);
  }, [phase, blur]);

  return { phase, target, blur, start };
}
