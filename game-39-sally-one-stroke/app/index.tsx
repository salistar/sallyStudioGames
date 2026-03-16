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
      <Text style={styles.logo}>✨</Text>
      <Text style={styles.title}>Sally's{"\n"}One Stroke</Text>
      <Text style={styles.subtitle}>Puzzle / Chemin Eulérien</Text>
      
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
        <Text style={styles.btnText}>Explorer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 20 },
  logo: { fontSize: 80, marginBottom: 10 },
  title: { color: CONFIG.COLORS.text, fontSize: 42, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: CONFIG.COLORS.muted, fontSize: 16, marginBottom: 20 },
  recordBox: { alignItems: 'center', backgroundColor: CONFIG.COLORS.surface, padding: 15, borderRadius: 15, minWidth: 200 },
  recordLabel: { color: CONFIG.COLORS.muted, fontSize: 10, fontWeight: '800' },
  recordValue: { color: CONFIG.COLORS.warning, fontSize: 24, fontWeight: '900' },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 60, paddingVertical: 18, borderRadius: 30, marginTop: 20 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
