import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎲</Text>
      <Text style={styles.title}>Dice Forge</Text>
      <Text style={styles.sub}>Améliore tes dés, vaincs tes ennemis</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Lancer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 80, marginBottom: 10 },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 10 },
  sub: { color: '#666', fontSize: 16, marginBottom: 40, textAlign: 'center' },
  btn: { backgroundColor: '#e67e22', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
