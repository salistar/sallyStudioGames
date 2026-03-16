import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useWordLogic } from '../hooks/useWordLogic';
import { WordGrid } from '../components/WordGrid';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function GameScreen() {
  const { grid, foundWords, currentStroke, addPoint, validate, isFinished } = useWordLogic();

  const handleEnd = () => {
    const success = validate();
    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (currentStroke.length > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mots trouvés: {foundWords.length} / {CONFIG.TARGET_WORDS.length}</Text>
      </View>

      <WordGrid grid={grid} currentStroke={currentStroke} onMove={addPoint} onEnd={handleEnd} />

      <View style={styles.foundList}>
          {CONFIG.TARGET_WORDS.map(word => (
              <Text key={word} style={[styles.wordItem, foundWords.includes(word) && styles.wordFound]}>
                  {word}
              </Text>
          ))}
      </View>

      {isFinished && (
          <View style={styles.win}>
              <Text style={styles.winText}>TERMINÉ !</Text>
              <Pressable style={styles.exitBtn} onPress={() => router.replace('/')}>
                  <Text style={styles.exitText}>Bravo !</Text>
              </Pressable>
          </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 20 },
  header: { paddingBottom: 10 },
  title: { color: '#fff', fontSize: 20, fontWeight: '800' },
  foundList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20, justifyContent: 'center' },
  wordItem: { color: CONFIG.COLORS.surface, fontSize: 14, fontWeight: '700', textDecorationLine: 'line-through' },
  wordFound: { color: CONFIG.COLORS.success, textDecorationLine: 'none' },
  win: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.8)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 20 },
  winText: { color: CONFIG.COLORS.success, fontSize: 48, fontWeight: '900' },
  exitBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  exitText: { color: '#fff', fontWeight: '800' },
});
