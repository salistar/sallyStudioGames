import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useScore } from '../hooks/useScore';
import { CONFIG } from '../constants/config';

export default function HomeScreen() {
  const { highScore, load } = useScore();
  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={[styles.logoCell, { backgroundColor: CONFIG.FLOOD_COLORS[i] }]} />
        ))}
      </View>
      <Text style={styles.title}>Sally's{"\n"}Color Flood</Text>
      <Text style={styles.subtitle}>Stratégie / Flood-fill</Text>
      
      {highScore > 0 && (
        <View style={styles.recordBox}>
          <Text style={styles.recordLabel}>MEILLEUR SCORE</Text>
          <Text style={styles.recordValue}>{highScore}</Text>
        </View>
      )}

      <Pressable
        style={styles.btn}
        onPress={() => router.push('/game')}
      >
        <Text style={styles.btnText}>Démarrer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 30 },
  logoGrid: { width: 80, height: 80, flexDirection: 'row', flexWrap: 'wrap', borderRadius: 10, overflow: 'hidden' },
  logoCell: { width: 40, height: 40 },
  title: { color: CONFIG.COLORS.text, fontSize: 42, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: CONFIG.COLORS.muted, fontSize: 16 },
  recordBox: { alignItems: 'center', backgroundColor: CONFIG.COLORS.surface, padding: 15, borderRadius: 15, minWidth: 200 },
  recordLabel: { color: CONFIG.COLORS.muted, fontSize: 10, fontWeight: '800' },
  recordValue: { color: CONFIG.COLORS.warning, fontSize: 24, fontWeight: '900' },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 60, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
