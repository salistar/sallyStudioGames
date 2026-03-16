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
  const { phase, balance, quake, survivalTime, start, end } = useGameLogic();
  const { score, add, save } = useScore();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
      if (Math.abs(balance) > 80) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
  }, [balance]);

  useEffect(() => {
    if (phase === 'gameover') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      save(Math.floor(survivalTime / 10));
    }
  }, [phase, survivalTime, save]);

  if (phase === 'gameover') {
    return (
      <View style={styles.overlay}>
        <Text style={styles.overTitle}>TOUMBÉ !</Text>
        <Text style={styles.finalTime}>{Math.floor(survivalTime / 10)}s sur le fil</Text>
        <Pressable style={styles.retryBtn} onPress={() => router.replace('/')}>
          <Text style={styles.retryText}>Accueil</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HUD time={survivalTime} score={score} />
      <View style={styles.content}>
        <GameUI balance={balance} />
        {Math.abs(balance) > 70 && (
          <Text style={styles.warning}>ATTENTION !</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', gap: 20 },
  overTitle: { color: CONFIG.COLORS.danger, fontSize: 48, fontWeight: '900' },
  finalTime: { color: '#fff', fontSize: 24, textAlign: 'center' },
  retryBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  retryText: { color: '#000', fontWeight: '800' },
  warning: { position: 'absolute', bottom: 200, color: CONFIG.COLORS.warning, fontSize: 24, fontWeight: '900' },
});
