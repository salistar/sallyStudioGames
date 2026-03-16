import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const KEY = 'echo_memo_scores';

export function useHighScore() {
  const [scores, setScores] = useState<{ round: number; date: string }[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) setScores(JSON.parse(raw));
    });
  }, []);

  const saveScore = async (round: number) => {
    const entry = { round, date: new Date().toLocaleDateString('fr-FR') };
    const updated = [...scores, entry].sort((a, b) => b.round - a.round).slice(0, 10);
    setScores(updated);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { scores, saveScore };
}
