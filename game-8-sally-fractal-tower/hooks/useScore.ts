import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'sally_fractal_tower_scores';

export function useScore() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) {
        const entries = JSON.parse(raw);
        setHighScore(Math.max(...entries.map((e: any) => e.score), 0));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const add = useCallback((pts: number) => {
    setScore(s => s + pts);
  }, []);

  const save = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      const entries = raw ? JSON.parse(raw) : [];
      const updated = [...entries, { score, date: new Date().toLocaleDateString('fr-FR') }]
        .sort((a: any, b: any) => b.score - a.score).slice(0, 20);
      await AsyncStorage.setItem(KEY, JSON.stringify(updated));
      if (score > highScore) setHighScore(score);
    } catch (e) {
      console.error(e);
    }
  }, [score, highScore]);

  return { score, highScore, add, save, load };
}
