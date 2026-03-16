import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useMazeLogic } from '../hooks/useMazeLogic';
import { MazeUI } from '../components/MazeUI';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { grid, phase, generate, move } = useMazeLogic();

  useEffect(() => {
    generate();
  }, [generate]);

  useEffect(() => {
    if (phase === 'won') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [phase]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trouve la sortie !</Text>
      <MazeUI grid={grid} onMove={move} />
      
      <View style={styles.footer}>
        <Pressable style={styles.resetBtn} onPress={generate}>
            <Text style={styles.resetText}>Nouveau Labyrinthe</Text>
        </Pressable>

        {phase === 'won' && (
            <View style={styles.winOverlay}>
                <Text style={styles.winText}>GAGNÉ !</Text>
                <Pressable style={styles.nextBtn} onPress={() => router.replace('/')}>
                    <Text style={styles.nextText}>Accueil</Text>
                </Pressable>
            </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 30 },
  title: { color: CONFIG.COLORS.text, fontSize: 28, fontWeight: '900' },
  footer: { marginTop: 20 },
  resetBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: CONFIG.COLORS.surface },
  resetText: { color: '#fff', fontWeight: '700' },
  winOverlay: { position: 'absolute', bottom: 100, alignItems: 'center', gap: 20 },
  winText: { color: CONFIG.COLORS.success, fontSize: 48, fontWeight: '900' },
  nextBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  nextText: { color: '#fff', fontWeight: '800' },
});
