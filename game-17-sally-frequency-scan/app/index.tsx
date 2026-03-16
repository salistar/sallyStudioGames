import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequency Scan</Text>
      <Text style={styles.sub}>Exerce ton oreille musicale</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Lancer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 36, fontWeight: '900', marginBottom: 8 },
  sub: { color: '#666', fontSize: 16, marginBottom: 40 },
  btn: { backgroundColor: '#1E90FF', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
