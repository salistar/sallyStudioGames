import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const KEY = 'constellation_scores';

export function useHighScore() {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(val => {
      if (val) setHighScore(parseInt(val));
    });
  }, []);

  const saveScore = async (score: number) => {
    if (score > highScore) {
      setHighScore(score);
      await AsyncStorage.setItem(KEY, score.toString());
    }
  };

  return { highScore, saveScore };
}
