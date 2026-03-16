import { useState, useCallback } from 'react';
import { Hex, Owner, BOARD_RADIUS } from '../constants/board';

export function useGameLogic() {
  const initBoard = () => {
    const hexes: Hex[] = [];
    for (let q = -BOARD_RADIUS; q <= BOARD_RADIUS; q++) {
      for (let r = Math.max(-BOARD_RADIUS, -q - BOARD_RADIUS); r <= Math.min(BOARD_RADIUS, -q + BOARD_RADIUS); r++) {
        hexes.push({ q, r, owner: 'none' });
      }
    }
    // Start positions
    hexes.find(h => h.q === 0 && h.r === -BOARD_RADIUS)!.owner = 'ai';
    hexes.find(h => h.q === 0 && h.r === BOARD_RADIUS)!.owner = 'player';
    return hexes;
  };

  const [board, setBoard] = useState<Hex[]>(initBoard());
  const [turn, setTurn] = useState<Owner>('player');

  const getNeighbors = (q: number, r: number) => {
    const directions = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    return directions.map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
  };

  const handleClick = useCallback((q: number, r: number) => {
    if (turn !== 'player') return;
    const hex = board.find(h => h.q === q && h.r === r);
    if (!hex || hex.owner !== 'none') return;

    // Must be adjacent to player territory
    const neighbors = getNeighbors(q, r);
    const hasFriend = neighbors.some(n => board.find(h => h.q === n.q && h.r === n.r)?.owner === 'player');
    
    if (hasFriend) {
      setBoard(prev => {
        const next = prev.map(h => (h.q === q && h.r === r) ? { ...h, owner: 'player' } : h);
        // Conquer enemy neighbors
        return next.map(h => {
          if (neighbors.some(n => n.q === h.q && n.r === h.r) && h.owner === 'ai') {
            return { ...h, owner: 'player' };
          }
          return h;
        });
      });
      setTurn('ai');
      // AI move logic could go here
    }
  }, [board, turn]);

  return { board, turn, handleClick };
}
