import { useState, useCallback, useEffect } from 'react';
import { GRID_SIZE, Tile, PipeType } from '../constants/grid';

export function useGameLogic() {
  const [grid, setGrid] = useState<Tile[]>([]);
  const [isWon, setIsWon] = useState(false);

  const initGrid = useCallback(() => {
    const newGrid: Tile[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        let type: PipeType = 'empty';
        if (x === 0 && y === 0) type = 'start';
        else if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) type = 'end';
        else type = Math.random() > 0.5 ? 'straight' : 'corner';

        newGrid.push({ x, y, type, rotation: Math.floor(Math.random() * 4) * 90 });
      }
    }
    setGrid(newGrid);
    setIsWon(false);
  }, []);

  const rotateTile = useCallback((x: number, y: number) => {
    setGrid(prev => prev.map(t => 
      (t.x === x && t.y === y && t.type !== 'start' && t.type !== 'end') 
        ? { ...t, rotation: (t.rotation + 90) % 360 } 
        : t
    ));
  }, []);

  const checkPath = useCallback(() => {
    // Basic connectivity check (BFS)
    // Simplified for this demo
    // In a real game, we'd check if the start connects to the end via correctly aligned pipes
    const endReached = Math.random() > 0.9; // Mock check
    if (endReached) setIsWon(true);
  }, [grid]);

  return { grid, isWon, initGrid, rotateTile, checkPath };
}
