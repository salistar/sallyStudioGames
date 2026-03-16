import { useState, useCallback } from 'react';

type Owner = 0 | 1 | 2; // 0: neutral, 1: P1, 2: P2

export function useGameLogic() {
  const [grid, setGrid] = useState<Owner[][]>(Array.from({ length: 10 }, () => Array(10).fill(0)));
  const [turn, setTurn] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<Owner>(0);

  const start = useCallback(() => {
    setGrid(Array.from({ length: 10 }, () => Array(10).fill(0)));
    setTurn(1);
    setWinner(0);
  }, []);

  const claim = useCallback((r: number, c: number) => {
    if (grid[r][c] !== 0 || winner !== 0) return;
    
    const newGrid = grid.map((row, ri) => row.map((cell, ci) => ri === r && ci === c ? turn : cell));
    setGrid(newGrid);

    // Check if full
    if (newGrid.every(row => row.every(cell => cell !== 0))) {
      const p1 = newGrid.flat().filter(x => x === 1).length;
      const p2 = newGrid.flat().filter(x => x === 2).length;
      setWinner(p1 > p2 ? 1 : p2 > p1 ? 2 : 0);
    } else {
      setTurn(t => t === 1 ? 2 : 1);
    }
  }, [grid, turn, winner]);

  return { grid, turn, winner, claim, start };
}
