import { useState, useCallback, useRef } from 'react';
import { GRID_W, GRID_H, Particle } from '../constants/grid';

export function useGameLogic() {
  const [grid, setGrid] = useState<Particle[]>(new Array(GRID_W * GRID_H).fill('empty'));
  const [brushType, setBrushType] = useState<Particle>('sand');

  const updateGrid = useCallback(() => {
    setGrid(prev => {
      const next = [...prev];
      for (let y = GRID_H - 2; y >= 0; y--) {
        for (let x = 0; x < GRID_W; x++) {
          const idx = y * GRID_W + x;
          const below = (y + 1) * GRID_W + x;
          const p = next[idx];

          if (p === 'sand') {
            if (next[below] === 'empty') {
              next[below] = 'sand';
              next[idx] = 'empty';
            } else if (x > 0 && next[below - 1] === 'empty') {
              next[below - 1] = 'sand';
              next[idx] = 'empty';
            } else if (x < GRID_W - 1 && next[below + 1] === 'empty') {
              next[below + 1] = 'sand';
              next[idx] = 'empty';
            }
          } else if (p === 'water') {
            if (next[below] === 'empty') {
              next[below] = 'water';
              next[idx] = 'empty';
            } else if (x > 0 && next[below - 1] === 'empty') {
              next[below - 1] = 'water';
              next[idx] = 'empty';
            } else if (x < GRID_W - 1 && next[below + 1] === 'empty') {
              next[below + 1] = 'water';
              next[idx] = 'empty';
            } else if (x > 0 && next[idx - 1] === 'empty') {
              next[idx - 1] = 'water';
              next[idx] = 'empty';
            } else if (x < GRID_W - 1 && next[idx + 1] === 'empty') {
              next[idx + 1] = 'water';
              next[idx] = 'empty';
            }
          }
        }
      }
      return next;
    });
  }, []);

  const addParticle = useCallback((x: number, y: number) => {
    const gx = Math.floor(x * (GRID_W / 400));
    const gy = Math.floor(y * (GRID_H / 600));
    if (gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H) {
      setGrid(prev => {
        const next = [...prev];
        next[gy * GRID_W + gx] = brushType;
        return next;
      });
    }
  }, [brushType]);

  const clear = useCallback(() => setGrid(new Array(GRID_W * GRID_H).fill('empty')), []);

  return { grid, brushType, setBrushType, updateGrid, addParticle, clear };
}
