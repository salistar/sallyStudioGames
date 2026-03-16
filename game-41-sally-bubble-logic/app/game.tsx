import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import levels from '../data/levels.json';
import { BubbleBoard } from '../components/BubbleBoard';
import { usePuzzleLogic } from '../hooks/usePuzzleLogic';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

const { width: SW } = Dimensions.get('window');

export default function GameScreen() {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = levels[levelIndex] as any;
  const cellSize = Math.floor((SW - 40) / level.grid);
  const { paths, drawing, startDraw, extendDraw, endDraw, isSolved, reset } = usePuzzleLogic(level.bubbles, level.grid);

  useEffect(() => {
    if (isSolved) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isSolved]);

  const nextLevel = () => {
      if (levelIndex < levels.length - 1) {
          setLevelIndex(levelIndex + 1);
          reset();
      } else {
          router.replace('/');
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Niveau {level.id}</Text>
      <BubbleBoard
        bubbles={level.bubbles} paths={paths} drawing={drawing}
        gridSize={level.grid} cellSize={cellSize}
        onStart={startDraw} onMove={extendDraw} onEnd={endDraw}
      />
      
      <View style={styles.footer}>
        <Pressable style={styles.resetBtn} onPress={reset}>
            <Text style={styles.resetText}>Réinitialiser</Text>
        </Pressable>

        {isSolved && (
            <Pressable style={styles.nextBtn} onPress={nextLevel}>
                <Text style={styles.nextText}>Suivant</Text>
            </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 30 },
  title: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: '900' },
  footer: { flexDirection: 'row', gap: 20 },
  resetBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, backgroundColor: CONFIG.COLORS.surface },
  resetText: { color: '#fff', fontWeight: '700' },
  nextBtn: { paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10, backgroundColor: CONFIG.COLORS.success },
  nextText: { color: '#fff', fontWeight: '800' },
});
