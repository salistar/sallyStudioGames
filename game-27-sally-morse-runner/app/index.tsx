import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📡</Text>
      <Text style={styles.title}>Morse Runner</Text>
      <Text style={styles.sub}>Maîtrise le code, sauve le monde</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Initialiser</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 80, marginBottom: 20 },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 10 },
  sub: { color: '#444', fontSize: 16, marginBottom: 40 },
  btn: { backgroundColor: '#00FF00', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#000', fontSize: 20, fontWeight: '800' },
});
