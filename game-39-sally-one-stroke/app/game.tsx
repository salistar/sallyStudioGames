import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { GameUI } from '../components/GameUI';
import { HUD } from '../components/HUD';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { phase, level, points, edges, path, visitedEdges, start, selectPoint } = useGameLogic();
  const { score, add, save } = useScore();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (phase === 'won') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      add(1000);
    }
  }, [phase, add]);

  const handleFinish = async () => {
    await save(level);
    router.replace({ 
      pathname: '/results', 
      params: { 
        score: String(score), 
        level: String(level) 
      } 
    });
  };

  return (
    <View style={styles.container}>
      <HUD level={level} score={score} onReset={start} />
      <View style={styles.content}>
        <GameUI 
          points={points} 
          edges={edges} 
          path={path} 
          visitedEdges={visitedEdges} 
          onSelectPoint={selectPoint} 
        />
        {phase === 'won' && (
          <View style={styles.winOverlay}>
            <Text style={styles.winText}>RÉUSSI !</Text>
            <Pressable style={styles.nextBtn} onPress={handleFinish}>
              <Text style={styles.nextText}>Terminer</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  winOverlay: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.8)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 20 },
  winText: { color: CONFIG.COLORS.success, fontSize: 48, fontWeight: '900' },
  nextBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  nextText: { color: '#fff', fontWeight: '800' },
});
