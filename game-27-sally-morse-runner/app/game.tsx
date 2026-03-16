import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { currentTarget, input, score, checkInput } = useGameLogic();

  const handlePress = (char: '.' | '-') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    checkInput(char);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      
      <View style={styles.display}>
        <Text style={styles.targetLetter}>{currentTarget}</Text>
        <Text style={styles.inputMorse}>{input || ' '}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.dotBtn} onPress={() => handlePress('.')}>
          <View style={styles.dot} />
        </Pressable>
        <Pressable style={styles.dashBtn} onPress={() => handlePress('-')}>
          <View style={styles.dash} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24, justifyContent: 'space-between' },
  score: { color: '#00FF00', fontSize: 24, fontWeight: '800', textAlign: 'right', marginTop: 40 },
  display: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  targetLetter: { color: '#fff', fontSize: 120, fontWeight: '900' },
  inputMorse: { color: '#00FF00', fontSize: 40, letterSpacing: 10, marginTop: 20 },
  controls: { flexDirection: 'row', gap: 20, marginBottom: 50 },
  dotBtn: { flex: 1, height: 100, backgroundColor: '#333', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  dashBtn: { flex: 2, height: 100, backgroundColor: '#333', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  dot: { width: 30, height: 30, backgroundColor: '#fff', borderRadius: 15 },
  dash: { width: 80, height: 20, backgroundColor: '#fff', borderRadius: 10 },
});
