import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { phase, level, bpm, lastBeat, isBeat, start, end } = useGameLogic();
  const { score, save, add } = useScore();
  const [p1Fails, setP1Fails] = useState(0);
  const [p2Fails, setP2Fails] = useState(0);

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

  const handleTap = (player: 1 | 2) => {
    const now = Date.now();
    const diff = Math.abs(now - lastBeat);
    const win = 60000 / bpm;
    
    // Check if close enough (±50ms)
    // Adjusting window slightly for better playability
    const threshold = 100; 

    if (diff < threshold || Math.abs(diff - win) < threshold) {
      add(10);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (player === 1) {
        setP1Fails(f => {
          if (f + 1 >= 3) end();
          return f + 1;
        });
      } else {
        setP2Fails(f => {
          if (f + 1 >= 3) end();
          return f + 1;
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Player 1 Area */}
      <Pressable 
        style={[styles.playerArea, { backgroundColor: isBeat ? CONFIG.COLORS.primary : CONFIG.COLORS.surface, transform: [{ rotate: '180deg' }] }]}
        onPress={() => handleTap(1)}
      >
        <Text style={styles.playerText}>Joueur 1</Text>
        <Text style={styles.failText}>Erreurs: {p1Fails}/3</Text>
      </Pressable>

      <View style={styles.meta}>
        <Text style={{ color: '#fff', fontSize: 18 }}>BPM: {bpm}</Text>
        <Text style={{ color: CONFIG.COLORS.warning, fontSize: 24, fontWeight: 'bold' }}>{score}</Text>
      </View>

      {/* Player 2 Area */}
      <Pressable 
        style={[styles.playerArea, { backgroundColor: isBeat ? CONFIG.COLORS.success : CONFIG.COLORS.surface }]}
        onPress={() => handleTap(2)}
      >
        <Text style={styles.playerText}>Joueur 2</Text>
        <Text style={styles.failText}>Erreurs: {p2Fails}/3</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background },
  playerArea: { flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 20 },
  playerText: { color: '#fff', fontSize: 32, fontWeight: '900' },
  failText: { color: CONFIG.COLORS.danger, fontSize: 16, marginTop: 10 },
  meta: { paddingVertical: 10, alignItems: 'center', backgroundColor: '#000' }
});
