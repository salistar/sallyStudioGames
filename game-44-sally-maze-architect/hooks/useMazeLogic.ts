import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../constants/config';

type CellType = 'empty' | 'wall' | 'start' | 'end' | 'path';

export function useMazeLogic() {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [phase, setPhase] = useState<'playing' | 'won'>('playing');

  const generate = useCallback(() => {
    const size = CONFIG.GRID_SIZE;
    const newGrid: CellType[][] = Array.from({ length: size }, () => Array(size).fill('empty'));
    
    // Add walls randomly
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (Math.random() < 0.25) newGrid[r][c] = 'wall';
      }
    }

    newGrid[0][0] = 'start';
    newGrid[size-1][size-1] = 'end';
    setGrid(newGrid);
    setPhase('playing');
  }, []);

  const move = useCallback((r: number, c: number) => {
    if (phase !== 'playing') return;
    if (r < 0 || r >= CONFIG.GRID_SIZE || c < 0 || c >= CONFIG.GRID_SIZE) return;
    
    setGrid(prev => {
        const next = prev.map(row => [...row]);
        if (next[r][c] === 'empty') {
            next[r][c] = 'path';
        } else if (next[r][c] === 'end') {
            setPhase('won');
        }
        return next;
    });
  }, [phase]);

  return { grid, phase, generate, move };
}
