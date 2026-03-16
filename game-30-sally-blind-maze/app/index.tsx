import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌑</Text>
      <Text style={styles.title}>Sally's{"\n"}Blind Maze</Text>
      <Text style={styles.sub}>Fies-toi aux vibrations</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Entrer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 80, marginBottom: 20 },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', textAlign: 'center', marginBottom: 10 },
  sub: { color: '#444', marginBottom: 40 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#000', fontSize: 20, fontWeight: '800' },
});
