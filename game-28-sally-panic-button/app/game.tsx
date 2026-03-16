import { View, StyleSheet } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { GameUI } from '../components/GameUI';
import { HUD } from '../components/HUD';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, level, currentChallenge, progress, start, end, handleAction } = useGameLogic();
  const { score, add, save } = useScore();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (phase === 'gameover') {
      save(level).then(() => {
        router.replace({ pathname: '/results', params: { score: String(score), level: String(level) } });
      });
    }
  }, [phase, score, level, save]);

  // Score accumulation based on level progress
  useEffect(() => {
    if (level > 0) add(100);
  }, [level]);

  return (
    <View style={styles.container}>
      <HUD score={score} level={level} />
      <GameUI 
        challenge={currentChallenge} 
        onAction={handleAction} 
        progress={progress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, justifyContent: 'center' },
});
