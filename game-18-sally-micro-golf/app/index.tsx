import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⛳</Text>
      <Text style={styles.title}>Micro Golf</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Jouer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#228B22', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 80, marginBottom: 20 },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 40 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#228B22', fontSize: 20, fontWeight: '800' },
});
