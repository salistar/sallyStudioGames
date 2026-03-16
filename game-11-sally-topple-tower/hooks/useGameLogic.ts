import { useState, useRef, useEffect, useCallback } from 'react';
import { Accelerometer } from 'expo-sensors';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [tilt, setTilt] = useState(0);
  
  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setTilt(0);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    
    const sub = Accelerometer.addListener(({ x }) => {
      setTilt(x);
    });
    Accelerometer.setUpdateInterval(50);
    
    return () => sub.remove();
  }, [phase]);

  return { phase, level, tilt, start, end, nextLevel };
}
