import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'sally_souk_trader_scores';

export function useScore() {
  const [cash, setCash] = useState(1000);
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

  const add = useCallback((amount: number) => {
    setCash(c => c + amount);
  }, []);

  const save = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      const entries = raw ? JSON.parse(raw) : [];
      const updated = [...entries, { score: cash, date: new Date().toLocaleDateString('fr-FR') }]
        .sort((a: any, b: any) => b.score - a.score).slice(0, 20);
      await AsyncStorage.setItem(KEY, JSON.stringify(updated));
      if (cash > highScore) setHighScore(cash);
    } catch (e) {
      console.error(e);
    }
  }, [cash, highScore]);

  return { cash, highScore, add, save, load };
}
