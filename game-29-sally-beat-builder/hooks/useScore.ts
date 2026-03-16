import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '26_beat_builder_scores';

export function useScore() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) setHighScore(parseInt(raw) || 0);
    } catch (e) {}
  }, []);

  const save = useCallback(async (val: number) => {
    try {
      if (val > highScore) {
        setHighScore(val);
        await AsyncStorage.setItem(KEY, val.toString());
      }
    } catch (e) {}
  }, [highScore]);

  return { score, highScore, save, load };
}
