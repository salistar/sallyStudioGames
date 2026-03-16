import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useHighScore } from '../hooks/useHighScore';

export default function HomeScreen() {
  const { highScore } = useHighScore();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>✨</Text>
      <Text style={styles.title}>Constellation Draw</Text>
      <Text style={styles.highScore}>Record: {highScore}</Text>
      
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Commencer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 10, textAlign: 'center' },
  highScore: { color: '#444', fontSize: 16, marginBottom: 40 },
  btn: { backgroundColor: '#3b3b98', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30, elevation: 5 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
