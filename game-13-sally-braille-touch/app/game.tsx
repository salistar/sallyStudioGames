import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { phase, level, targetChar, userPattern, start, end, toggleDot, pickNewChar } = useGameLogic();
  const { score, save, add } = useScore();

  useEffect(() => {
    start();
  }, []);

  const handleToggle = (i: number) => {
    toggleDot(i);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleValidate = () => {
    const targetPattern = (CONFIG.BRAILLE as any)[targetChar];
    const isCorrect = userPattern.every((v, i) => v === targetPattern[i]);

    if (isCorrect) {
      add(100);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      pickNewChar();
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      end();
    }
  };

  useEffect(() => {
    if (phase === 'gameover') {
      save(level).then(() => {
        router.replace({ pathname: '/results', params: { score: String(score), level: String(level) } });
      });
    }
  }, [phase, score, level, save]);

  return (
    <View style={styles.container}>
      <Text style={styles.charText}>{targetChar}</Text>
      
      <View style={styles.grid}>
        <View style={styles.col}>
          {[0, 1, 2].map(i => (
            <Pressable 
              key={i} 
              onPress={() => handleToggle(i)}
              style={[styles.dot, { backgroundColor: userPattern[i] ? CONFIG.COLORS.primary : CONFIG.COLORS.surface }]} 
            />
          ))}
        </View>
        <View style={styles.col}>
          {[3, 4, 5].map(i => (
            <Pressable 
              key={i} 
              onPress={() => handleToggle(i)}
              style={[styles.dot, { backgroundColor: userPattern[i] ? CONFIG.COLORS.primary : CONFIG.COLORS.surface }]} 
            />
          ))}
        </View>
      </View>

      <Pressable onPress={handleValidate} style={styles.btn}>
        <Text style={styles.btnText}>Valider Pattern</Text>
      </Pressable>

      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center' },
  charText: { color: CONFIG.COLORS.text, fontSize: 84, fontWeight: 'bold', marginBottom: 40 },
  grid: { flexDirection: 'row', gap: 40 },
  col: { gap: 40 },
  dot: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#333' },
  btn: { marginTop: 60, backgroundColor: CONFIG.COLORS.success, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  scoreText: { color: CONFIG.COLORS.muted, marginTop: 40 }
});
