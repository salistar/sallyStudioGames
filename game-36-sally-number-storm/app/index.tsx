import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡</Text>
      <Text style={styles.title}>Sally's{"\n"}Number Storm</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Démarrer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 80, marginBottom: 20 },
  title: { color: '#F9FAFB', fontSize: 40, fontWeight: '900', textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#FFD700', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#000', fontSize: 20, fontWeight: '800' },
});
