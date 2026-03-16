import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import Slider from '@react-native-community/slider';
import { useAudioEngine } from '../hooks/useAudioEngine';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { targetFreq, userGuess, setUserGuess, score, feedback, generateNewChallenge, checkGuess } = useGameLogic();
  const { playFrequency } = useAudioEngine();

  const handlePlay = () => {
    if (targetFreq === 0) generateNewChallenge();
    playFrequency(targetFreq || 440);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleTest = () => {
    playFrequency(userGuess);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      
      <View style={styles.stage}>
        <Pressable style={styles.playBtn} onPress={handlePlay}>
          <Text style={styles.playIcon}>🔊</Text>
          <Text style={styles.playText}>Écouter la cible</Text>
        </Pressable>
        
        <Text style={styles.feedback}>{feedback}</Text>
      </View>

      <View style={styles.controls}>
        <Text style={styles.freqLabel}>{Math.round(userGuess)} Hz</Text>
        <Slider
          style={styles.slider}
          minimumValue={200}
          maximumValue={1000}
          value={userGuess}
          onValueChange={setUserGuess}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#333"
        />
        
        <View style={styles.row}>
          <Pressable style={styles.testBtn} onPress={handleTest}>
            <Text style={styles.testBtnText}>Tester</Text>
          </Pressable>
          <Pressable style={styles.valBtn} onPress={checkGuess}>
            <Text style={styles.valBtnText}>Valider</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.nextBtn} onPress={generateNewChallenge}>
        <Text style={styles.nextBtnText}>Nouvelle fréquence</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'space-between' },
  score: { color: '#1E90FF', fontSize: 24, fontWeight: '800', textAlign: 'right', marginTop: 40 },
  stage: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  playBtn: { alignItems: 'center', gap: 10 },
  playIcon: { fontSize: 80 },
  playText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  feedback: { color: '#FFD700', fontSize: 20, marginTop: 20, height: 30 },
  controls: { backgroundColor: '#111', padding: 25, borderRadius: 20, gap: 20 },
  freqLabel: { color: '#fff', fontSize: 32, fontWeight: '900', textAlign: 'center' },
  slider: { width: '100%', height: 40 },
  row: { flexDirection: 'row', gap: 15 },
  testBtn: { flex: 1, padding: 15, borderRadius: 12, borderWeight: 1, borderColor: '#333', borderStyle: 'solid', alignItems: 'center', borderWidth: 1 },
  testBtnText: { color: '#aaa', fontWeight: '600' },
  valBtn: { flex: 2, backgroundColor: '#1E90FF', padding: 15, borderRadius: 12, alignItems: 'center' },
  valBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  nextBtn: { padding: 10, alignItems: 'center', marginBottom: 20 },
  nextBtnText: { color: '#444' },
});
