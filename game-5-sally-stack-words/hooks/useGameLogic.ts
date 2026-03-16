import { useState, useCallback } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<string[][]>([]);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    generateGrid();
  }, []);

  const generateGrid = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newGrid = Array.from({ length: 8 }, () => 
      Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)])
    );
    setGrid(newGrid);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
    generateGrid();
  }, [generateGrid]);

  return { phase, level, grid, start, end, nextLevel };
}
