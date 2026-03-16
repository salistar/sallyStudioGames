import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function ResultsScreen() {
  const { score, level } = useLocalSearchParams<{ score: string; level: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NIVEAU {level} COMPLÉTÉ</Text>
      <Text style={styles.scoreValue}>{score}</Text>
      <Text style={styles.scoreLabel}>POINTS</Text>
      
      <Pressable
        style={styles.retryBtn}
        onPress={() => router.replace('/game')}
      >
        <Text style={styles.retryText}>Rejouer</Text>
      </Pressable>
      
      <Pressable onPress={() => router.replace('/')}>
        <Text style={styles.homeText}>Retour à l'accueil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 20 },
  title: { fontSize: 24, fontWeight: '900', color: CONFIG.COLORS.success },
  scoreValue: { color: CONFIG.COLORS.text, fontSize: 80, fontWeight: '900' },
  scoreLabel: { color: CONFIG.COLORS.muted, letterSpacing: 5 },
  retryBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30, marginTop: 40 },
  retryText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  homeText: { color: CONFIG.COLORS.muted, fontSize: 14 },
});
