import { useState, useCallback } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
  }, []);

  return { phase, level, start, end, nextLevel };
}
