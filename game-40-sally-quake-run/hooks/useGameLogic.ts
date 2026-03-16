import { useState, useCallback, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import { CONFIG } from '../constants/config';

export function useGameLogic() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [balance, setBalance] = useState(0);
  const [quake, setQuake] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  const accelerometerSubscription = useRef<any>(null);

  const start = useCallback(() => {
    setPhase('playing');
    setBalance(0);
    setSurvivalTime(0);
    Accelerometer.setUpdateInterval(50);
    accelerometerSubscription.current = Accelerometer.addListener(({ x }) => {
        setBalance(prev => {
            const next = prev + x * CONFIG.SENSITIVITY;
            if (Math.abs(next) > 100) return next > 0 ? 100 : -100;
            return next;
        });
    });
  }, []);

  const end = useCallback(() => {
    setPhase('gameover');
    accelerometerSubscription.current?.remove();
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;

    const interval = setInterval(() => {
        setSurvivalTime(t => t + 1);
        
        // Add random quake
        const q = (Math.random() - 0.5) * 5;
        setQuake(q);
        setBalance(b => {
            const next = b + q;
            if (Math.abs(next) > 80) return next; // Danger zone
            return next;
        });

        if (Math.abs(balance) > 95) {
            end();
        }
    }, 100);

    return () => clearInterval(interval);
  }, [phase, balance, end]);

  useEffect(() => {
      return () => accelerometerSubscription.current?.remove();
  }, []);

  return { phase, balance, quake, survivalTime, start, end };
}
