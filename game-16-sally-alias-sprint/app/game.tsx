import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function GameScreen() {
  const { currentCard, score, timeLeft, isActive, isFinished, startRound, correct, skip } = useGameLogic();

  if (!isActive && !isFinished) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.readyText}>Prêt ?</Text>
        <Pressable style={styles.startBtn} onPress={startRound}>
          <Text style={styles.startBtnText}>C'est parti !</Text>
        </Pressable>
      </View>
    );
  }

  if (isFinished) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.gameOver}>Temps écoulé !</Text>
        <Text style={styles.finalScore}>Score final: {score}</Text>
        <Pressable style={styles.startBtn} onPress={startRound}>
          <Text style={styles.startBtnText}>Rejouer</Text>
        </Pressable>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Menu</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Temps</Text>
          <Text style={[styles.statValue, timeLeft < 10 && styles.danger]}>{timeLeft}s</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.word}>{currentCard.word}</Text>
        <View style={styles.divider} />
        <Text style={styles.forbiddenLabel}>INTERDIT :</Text>
        {currentCard.forbidden.map((f, i) => (
          <Text key={i} style={styles.forbiddenWord}>• {f}</Text>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable 
          style={[styles.actionBtn, styles.skipBtn]} 
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            skip();
          }}
        >
          <Text style={styles.actionBtnText}>PASSER (-1)</Text>
        </Pressable>
        <Pressable 
          style={[styles.actionBtn, styles.correctBtn]} 
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            correct();
          }}
        >
          <Text style={styles.actionBtnText}>TROUVÉ (+1)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF4757', padding: 20 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  readyText: { color: '#fff', fontSize: 48, fontWeight: '800', marginBottom: 40 },
  startBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 18, borderRadius: 35 },
  startBtnText: { color: '#FF4757', fontSize: 20, fontWeight: '700' },
  gameOver: { color: '#fff', fontSize: 36, fontWeight: '800', marginBottom: 10 },
  finalScore: { color: '#fff', fontSize: 24, marginBottom: 40 },
  backBtn: { marginTop: 20 },
  backBtnText: { color: 'rgba(255,255,255,0.6)', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 },
  stat: { alignItems: 'center' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase' },
  statValue: { color: '#fff', fontSize: 24, fontWeight: '800' },
  danger: { color: '#FFBD2E' },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 25, marginVertical: 30, padding: 30, alignItems: 'center', elevation: 10 },
  word: { fontSize: 32, fontWeight: '900', color: '#111', textAlign: 'center', marginBottom: 20 },
  divider: { width: '80%', height: 2, backgroundColor: '#F1F2F6', marginBottom: 20 },
  forbiddenLabel: { color: '#FF4757', fontWeight: '800', fontSize: 14, marginBottom: 15 },
  forbiddenWord: { fontSize: 18, color: '#57606f', marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  actionBtn: { flex: 1, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  skipBtn: { backgroundColor: 'rgba(255,255,255,0.2)' },
  correctBtn: { backgroundColor: '#2ED573' },
  actionBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
