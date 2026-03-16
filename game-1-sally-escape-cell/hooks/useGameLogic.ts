import { useState, useCallback } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState<string[]>([]);
  const [room, setRoom] = useState(1);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setRoom(1);
    setInventory([]);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
  }, []);

  const nextRoom = useCallback(() => {
    setRoom(r => Math.min(r + 1, 5));
    if (room === 5) end();
  }, [room, end]);

  const addToInventory = useCallback((item: string) => {
    setInventory(prev => [...prev, item]);
  }, []);

  return { phase, level, room, inventory, start, end, nextLevel, nextRoom, addToInventory };
}
