import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';

export default function GameScreen() {
  const { currentWord, input, score, timer, phase, wpm, start, onInputChange } = useGameLogic();

  if (phase === 'idle') {
    return (
        <View style={styles.center}>
            <Pressable style={styles.startBtn} onPress={start}><Text style={styles.btnText}>DÉMARRER</Text></Pressable>
        </View>
    );
  }

  if (phase === 'gameover') {
    return (
        <View style={styles.center}>
            <Text style={styles.finalScore}>Score: {score}</Text>
            <Text style={styles.finalWpm}>{wpm} WPM</Text>
            <Pressable style={styles.startBtn} onPress={() => router.replace('/')}><Text style={styles.btnText}>RETOUR</Text></Pressable>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.meta}>Timer: {timer}s</Text>
        <Text style={styles.meta}>WPM: {wpm}</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.target}>{currentWord}</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={onInputChange}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Tape ici..."
          placeholderTextColor="#444"
        />
      </View>

      <Text style={styles.score}>Mots: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, padding: 20 },
  center: { flex: 1, backgroundColor: CONFIG.COLORS.background, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 },
  meta: { color: CONFIG.COLORS.warning, fontSize: 18, fontWeight: '700' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  target: { color: '#fff', fontSize: 64, fontWeight: '900', marginBottom: 30 },
  input: { backgroundColor: '#1e293b', width: '100%', height: 60, borderRadius: 15, color: '#fff', fontSize: 24, paddingHorizontal: 20, textAlign: 'center' },
  score: { color: CONFIG.COLORS.muted, fontSize: 20, textAlign: 'center', marginBottom: 40 },
  startBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  btnText: { color: '#fff', fontWeight: '800' },
  finalScore: { color: '#fff', fontSize: 48, fontWeight: '900' },
  finalWpm: { color: CONFIG.COLORS.success, fontSize: 24, marginBottom: 30 },
});
