import { useState, useCallback } from 'react';
import { CONFIG } from '../constants/config';

type Phase = 'idle' | 'playing' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [day, setDay] = useState(1);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [inventory, setInventory] = useState<Record<string, number>>({});
  
  const generatePrices = useCallback(() => {
    const newPrices: Record<string, number> = {};
    CONFIG.GOODS.forEach(g => {
      const fluctuation = 0.5 + Math.random();
      newPrices[g.id] = Math.round(g.basePrice * fluctuation);
    });
    setPrices(newPrices);
  }, []);

  const start = useCallback(() => {
    setPhase('playing');
    setDay(1);
    setInventory({});
    generatePrices();
  }, [generatePrices]);

  const nextDay = useCallback(() => {
    if (day >= CONFIG.DAYS) {
      setPhase('gameover');
      return;
    }
    setDay(d => d + 1);
    generatePrices();
  }, [day, generatePrices]);

  return { phase, day, prices, inventory, setInventory, start, nextDay };
}
