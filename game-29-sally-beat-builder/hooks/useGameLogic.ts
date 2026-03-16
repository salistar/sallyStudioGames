import { useState, useEffect, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import { CONFIG } from '../constants/config';

export function useGameLogic() {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(CONFIG.TRACKS).fill(0).map(() => Array(CONFIG.STEPS).fill(false))
  );
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(CONFIG.BPM);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleStep = useCallback((trackIdx: number, stepIdx: number) => {
    setGrid(prev => {
      const next = [...prev.map(row => [...row])];
      next[trackIdx][stepIdx] = !next[trackIdx][stepIdx];
      return next;
    });
  }, []);

  const playStep = useCallback(() => {
    setStep(s => {
      const next = (s + 1) % CONFIG.STEPS;
      // Triggers for active steps in current column would go here
      return next;
    });
  }, []);

  useEffect(() => {
    if (playing) {
      const interval = (60 / bpm / 4) * 1000; // 16th notes
      timerRef.current = setInterval(playStep, interval);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, bpm, playStep]);

  return { grid, step, playing, setPlaying, bpm, setBpm, toggleStep };
}
