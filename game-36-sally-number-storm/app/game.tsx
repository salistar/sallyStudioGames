import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { numbers, target, currentSum, score, phase, selectNumber } = useGameLogic();

  if (phase === 'gameover') {
    return (
      <View style={styles.center}>
        <Text style={styles.gameOverText}>GAME OVER</Text>
        <Text style={styles.finalScore}>Score: {score}</Text>
        <Pressable style={styles.retryBtn} onPress={() => router.replace('/')}>
          <Text style={styles.retryText}>Accueil</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View style={styles.targetCard}>
          <Text style={styles.targetLabel}>CIBLE</Text>
          <Text style={styles.targetValue}>{target}</Text>
        </View>
        <View style={styles.sumCard}>
          <Text style={styles.sumLabel}>SOMME</Text>
          <Text style={styles.sumValue}>{currentSum}</Text>
        </View>
        <Text style={styles.scoreText}>{score}</Text>
      </View>

      <View style={styles.playArea}>
        {numbers.map(n => (
          <Pressable
            key={n.id}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              selectNumber(n.id);
            }}
            style={[styles.numberBubble, { left: n.x, top: n.y }]}
          >
            <Text style={styles.numberText}>{n.value}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  hud: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  targetCard: { alignItems: 'center', backgroundColor: CONFIG.COLORS.target, padding: 10, borderRadius: 10 },
  targetLabel: { fontSize: 10, fontWeight: '800', color: '#000' },
  targetValue: { fontSize: 32, fontWeight: '900', color: '#000' },
  sumCard: { alignItems: 'center', backgroundColor: '#333', padding: 10, borderRadius: 10 },
  sumLabel: { fontSize: 10, fontWeight: '800', color: '#fff' },
  sumValue: { fontSize: 32, fontWeight: '900', color: CONFIG.COLORS.success },
  scoreText: { color: '#fff', fontSize: 24, fontWeight: '800' },
  playArea: { flex: 1 },
  numberBubble: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: CONFIG.COLORS.primary, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  numberText: { color: '#fff', fontSize: 24, fontWeight: '900' },
  gameOverText: { color: CONFIG.COLORS.danger, fontSize: 48, fontWeight: '900', marginBottom: 10 },
  finalScore: { color: '#fff', fontSize: 24, marginBottom: 30 },
  retryBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  retryText: { color: '#000', fontWeight: '800' },
});
