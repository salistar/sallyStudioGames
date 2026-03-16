import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../constants/config';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover' | 'won';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<string[][]>([]);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(25);

  const generateGrid = useCallback(() => {
    const newGrid = Array.from({ length: CONFIG.GRID_SIZE }, () =>
      Array.from({ length: CONFIG.GRID_SIZE }, () => 
        CONFIG.FLOOD_COLORS[Math.floor(Math.random() * CONFIG.FLOOD_COLORS.length)]
      )
    );
    setGrid(newGrid);
  }, []);

  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setMoves(0);
    setMaxMoves(25);
    generateGrid();
  }, [generateGrid]);

  const flood = useCallback((newColor: string) => {
    if (phase !== 'playing') return;
    const targetColor = grid[0][0];
    if (newColor === targetColor) return;

    setGrid(prev => {
      const next = prev.map(row => [...row]);
      const queue: [number, number][] = [[0, 0]];
      const seen = new Set<string>(['0,0']);
      
      while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        next[r][c] = newColor;

        const neighbors = [
          [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
        ];

        for (const [nr, nc] of neighbors) {
          if (nr >= 0 && nr < CONFIG.GRID_SIZE && nc >= 0 && nc < CONFIG.GRID_SIZE) {
            const key = `${nr},${nc}`;
            if (!seen.has(key) && prev[nr][nc] === targetColor) {
              seen.add(key);
              queue.push([nr, nc]);
            }
          }
        }
      }
      return next;
    });

    setMoves(m => {
      const nextMoves = m + 1;
      return nextMoves;
    });
  }, [grid, phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const firstColor = grid[0][0];
    const isWon = grid.every(row => row.every(cell => cell === firstColor));
    if (isWon) {
      setPhase('won');
    } else if (moves >= maxMoves) {
      setPhase('gameover');
    }
  }, [grid, moves, maxMoves, phase]);

  return { phase, level, grid, moves, maxMoves, start, flood };
}
