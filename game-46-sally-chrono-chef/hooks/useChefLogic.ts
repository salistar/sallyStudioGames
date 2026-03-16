import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../constants/config';

interface Order { id:number; recipe:any; timeRemaining:number; }

export function useChefLogic() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPlate, setCurrentPlate] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG.TIME_LIMIT);
  const [phase, setPhase] = useState<'playing' | 'gameover'>('playing');

  const addIngredient = useCallback((id: string) => {
    if (phase !== 'playing') return;
    setCurrentPlate(prev => {
        if (prev.length >= 5) return prev;
        return [...prev, id];
    });
  }, [phase]);

  const clearPlate = useCallback(() => setCurrentPlate([]), []);

  const spawnOrder = useCallback(() => {
    const recipe = CONFIG.RECIPES[Math.floor(Math.random() * CONFIG.RECIPES.length)];
    setOrders(prev => [...prev, { id: Date.now(), recipe, timeRemaining: 15 }]);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(spawnOrder, 5000);
    return () => clearInterval(interval);
  }, [spawnOrder, phase]);

  const serve = useCallback(() => {
    const orderIdx = orders.findIndex(o => {
        const recipeItems = [...o.recipe.items].sort();
        const plateItems = [...currentPlate].sort();
        return JSON.stringify(recipeItems) === JSON.stringify(plateItems);
    });

    if (orderIdx !== -1) {
        setScore(s => s + orders[orderIdx].recipe.points);
        setOrders(prev => prev.filter((_, i) => i !== orderIdx));
        setCurrentPlate([]);
        return true;
    }
    return false;
  }, [orders, currentPlate]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
        setTimeLeft(t => {
            if (t <= 1) {
                setPhase('gameover');
                return 0;
            }
            return t - 1;
        });
        setOrders(prev => prev.map(o => ({ ...o, timeRemaining: o.timeRemaining - 1 })).filter(o => o.timeRemaining > 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  return { orders, currentPlate, score, timeLeft, phase, addIngredient, clearPlate, serve };
}
