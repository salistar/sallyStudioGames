import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Écho Mémo</Text>
      <Text style={styles.sub}>Reproduis la séquence</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Jouer</Text>
      </Pressable>
      <Pressable style={styles.btnSecondary} onPress={() => router.push('/scores')}>
        <Text style={styles.btnSecondaryText}>Scores</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { color: '#fff', fontSize: 42, fontWeight: '800', letterSpacing: 2 },
  sub: { color: '#666', fontSize: 16, marginBottom: 20 },
  btn: { backgroundColor: '#FFA502', paddingHorizontal: 50, paddingVertical: 16, borderRadius: 30 },
  btnText: { color: '#111', fontSize: 20, fontWeight: '700' },
  btnSecondary: { padding: 12 },
  btnSecondaryText: { color: '#555', fontSize: 14 },
});
