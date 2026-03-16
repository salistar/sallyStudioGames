import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { GameUI } from '../components/GameUI';
import { HUD } from '../components/HUD';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function GameScreen() {
  const { phase, grid, moves, maxMoves, start, flood } = useGameLogic();
  const { score, add, save } = useScore();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (phase === 'won') {
      const bonus = (maxMoves - moves) * 100;
      add(1000 + bonus);
    }
  }, [phase, moves, maxMoves, add]);

  const handleFinish = async () => {
    await save(moves);
    router.replace({ 
      pathname: '/results', 
      params: { 
        score: String(score), 
        status: phase === 'won' ? 'victory' : 'defeat' 
      } 
    });
  };

  if (phase === 'won' || phase === 'gameover') {
    return (
      <View style={styles.overlay}>
        <Text style={[styles.statusTitle, { color: phase === 'won' ? CONFIG.COLORS.success : CONFIG.COLORS.danger }]}>
          {phase === 'won' ? 'VICTOIRE !' : 'DÉFAITE'}
        </Text>
        <Text style={styles.finalScore}>Score: {score}</Text>
        <Pressable style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishText}>Continuer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <GameUI grid={grid} />
      </View>
      <HUD moves={moves} maxMoves={maxMoves} onFlood={flood} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', gap: 20 },
  statusTitle: { fontSize: 48, fontWeight: '900' },
  finalScore: { color: '#fff', fontSize: 24 },
  finishBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  finishText: { color: '#000', fontWeight: '800' },
});
