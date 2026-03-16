import { useState, useCallback } from 'react';
import { CONFIG } from '../constants/config';

type Pos = { x: number; y: number };

export function useGameLogic() {
  const [agent, setAgent] = useState<Pos>({ x: 1, y: 1 });
  const [guards, setGuards] = useState<any[]>([
    { pos: { x: 5, y: 5 }, dir: 'right', path: [{x:5, y:5}, {x:8, y:5}] }
  ]);
  const [walls, setWalls] = useState<Pos[]>([{ x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 2 }]);
  const [goal, setGoal] = useState<Pos>({ x: 8, y: 8 });
  const [phase, setPhase] = useState<'playing' | 'caught' | 'won'>('playing');

  const moveAgent = useCallback((dir: Pos) => {
    if (phase !== 'playing') return;
    const next = { x: agent.x + dir.x, y: agent.y + dir.y };
    
    // Bounds & Walls
    if (next.x < 0 || next.x >= CONFIG.GRID_SIZE || next.y < 0 || next.y >= CONFIG.GRID_SIZE) return;
    if (walls.some(w => w.x === next.x && w.y === next.y)) return;

    setAgent(next);

    // Goal Check
    if (next.x === goal.x && next.y === goal.y) {
      setPhase('won');
    }

    // Guard Vision Check (Simulated)
    guards.forEach(g => {
        if (Math.abs(g.pos.x - next.x) < 2 && Math.abs(g.pos.y - next.y) < 2) {
            setPhase('caught');
        }
    });

    // Guard Patrol (Simulated move)
  }, [agent, walls, goal, guards, phase]);

  return { agent, guards, walls, goal, phase, moveAgent };
}
