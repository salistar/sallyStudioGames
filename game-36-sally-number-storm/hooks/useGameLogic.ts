import { useState, useCallback, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { CONFIG } from '../constants/config';

const { width, height } = Dimensions.get('window');

export function useGameLogic() {
  const [numbers, setNumbers] = useState<any[]>([]);
  const [target, setTarget] = useState(10);
  const [currentSum, setCurrentSum] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'playing' | 'gameover'>('playing');
  const frameRef = useRef<number>(0);

  const spawnNumber = useCallback(() => {
    const newVal = {
      id: Date.now(),
      value: Math.ceil(Math.random() * CONFIG.MAX_NUMBER),
      x: Math.random() * (width - 60),
      y: -50,
    };
    setNumbers(prev => [...prev, newVal]);
  }, []);

  const update = useCallback(() => {
    setNumbers(prev => {
      const next = prev.map(n => ({ ...n, y: n.y + CONFIG.FALL_SPEED }));
      if (next.some(n => n.y > height - 100)) setPhase('gameover');
      return next;
    });
    frameRef.current = requestAnimationFrame(update);
  }, []);

  const selectNumber = useCallback((id: number) => {
    const num = numbers.find(n => n.id === id);
    if (!num) return;

    const newSum = currentSum + num.value;
    if (newSum === target) {
      setScore(s => s + 100);
      setCurrentSum(0);
      setTarget(Math.floor(Math.random() * 15) + 5);
      setNumbers(prev => prev.filter(n => n.id !== id));
    } else if (newSum > target) {
      setCurrentSum(0);
    } else {
      setCurrentSum(newSum);
      setNumbers(prev => prev.filter(n => n.id !== id));
    }
  }, [numbers, currentSum, target]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    const interval = setInterval(spawnNumber, CONFIG.SPAWN_INTERVAL);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearInterval(interval);
    };
  }, [update, spawnNumber]);

  return { numbers, target, currentSum, score, phase, selectNumber };
}
