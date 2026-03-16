import { useState, useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { CONFIG } from '../constants/config';

type Cell = { x: number; y: number; walls: { top: boolean; right: boolean; bottom: boolean; left: boolean } };

export function useGameLogic() {
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [exit, setExit] = useState({ x: CONFIG.MAZE_SIZE - 1, y: CONFIG.MAZE_SIZE - 1 });
  const [phase, setPhase] = useState<'playing' | 'won'>('playing');

  const generateMaze = useCallback(() => {
    const size = CONFIG.MAZE_SIZE;
    const newMaze: Cell[][] = Array(size).fill(0).map((_, y) => 
      Array(size).fill(0).map((_, x) => ({
        x, y, walls: { top: true, right: true, bottom: true, left: true }
      }))
    );

    const stack: { x: number; y: number }[] = [];
    const visited = new Set<string>();
    let current = { x: 0, y: 0 };
    visited.add('0,0');

    while (true) {
      const neighbors = [
        { x: current.x, y: current.y - 1, wall: 'top', opp: 'bottom' },
        { x: current.x + 1, y: current.y, wall: 'right', opp: 'left' },
        { x: current.x, y: current.y + 1, wall: 'bottom', opp: 'top' },
        { x: current.x - 1, y: current.y, wall: 'left', opp: 'right' },
      ].filter(n => n.x >= 0 && n.x < size && n.y >= 0 && n.y < size && !visited.has(`${n.x},${n.y}`));

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        // @ts-ignore
        newMaze[current.y][current.x].walls[next.wall] = false;
        // @ts-ignore
        newMaze[next.y][next.x].walls[next.opp] = false;
        visited.add(`${next.x},${next.y}`);
        stack.push(current);
        current = { x: next.x, y: next.y };
      } else if (stack.length > 0) {
        current = stack.pop()!;
      } else {
        break;
      }
    }
    setMaze(newMaze);
    setPlayer({ x: 0, y: 0 });
    setPhase('playing');
  }, []);

  const move = useCallback((dir: 'top' | 'right' | 'bottom' | 'left') => {
    if (phase !== 'playing') return;
    const cell = maze[player.y][player.x];
    if (!cell.walls[dir]) {
      const next = { ...player };
      if (dir === 'top') next.y--;
      if (dir === 'right') next.x++;
      if (dir === 'bottom') next.y++;
      if (dir === 'left') next.x--;

      setPlayer(next);
      if (next.x === exit.x && next.y === exit.y) {
        setPhase('won');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [maze, player, phase, exit]);

  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  return { maze, player, move, phase, restart: generateMaze };
}
