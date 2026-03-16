import { useState, useCallback, useEffect } from 'react';

type Phase = 'idle' | 'playing' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [blocks, setBlocks] = useState<{ id: number; y: number; width: number; x: number }[]>([]);
  const [currentX, setCurrentX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [width, setWidth] = useState(150);
  
  const start = useCallback(() => {
    setPhase('playing');
    setBlocks([{ id: 0, y: 0, width: 150, x: 100 }]);
    setCurrentX(0);
    setWidth(150);
  }, []);

  const place = useCallback(() => {
    const lastBlock = blocks[blocks.length - 1];
    const diff = Math.abs(currentX - lastBlock.x);
    
    if (diff >= width) {
      setPhase('gameover');
      return;
    }

    const newWidth = width - diff;
    const newX = currentX > lastBlock.x ? currentX : lastBlock.x;
    
    setBlocks(prev => [...prev, { id: prev.length, y: prev.length * 30, width: newWidth, x: newX }]);
    setWidth(newWidth);
    setCurrentX(0);
  }, [blocks, currentX, width]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(() => {
      setCurrentX(x => {
        if (x > 250) setDirection(-1);
        if (x < -50) setDirection(1);
        return x + direction * 5;
      });
    }, 20);
    return () => clearInterval(id);
  }, [phase, direction]);

  return { phase, blocks, currentX, width, start, place };
}
