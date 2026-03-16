import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'sally_swap_frenzy_scores';

export function useScore() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) {
        const entries = JSON.parse(raw);
        setHighScore(Math.max(...entries.map((e: any) => e.score), 0));
      }
    } catch (e) {
      console.error("Failed to load scores", e);
    }
  }, []);

  const add = useCallback((base: number, isCombo = false) => {
    const mult = isCombo ? Math.min(combo * 0.1 + 1, 3) : 1;
    const pts = Math.round(base * mult);
    setScore(s => s + pts);
    if (isCombo) setCombo(c => c + 1);
    return pts;
  }, [combo]);

  const resetCombo = () => setCombo(0);

  const save = useCallback(async (level: number) => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      const entries = raw ? JSON.parse(raw) : [];
      const updated = [...entries, { score, level, date: new Date().toLocaleDateString('fr-FR') }]
        .sort((a: any, b: any) => b.score - a.score).slice(0, 20);
      await AsyncStorage.setItem(KEY, JSON.stringify(updated));
      if (score > highScore) setHighScore(score);
    } catch (e) {
      console.error("Failed to save score", e);
    }
  }, [score, highScore]);

  return { score, combo, highScore, add, resetCombo, save, load };
}
