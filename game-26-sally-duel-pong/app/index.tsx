import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duel Pong</Text>
      <Text style={styles.sub}>1 VS 1 Local</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Lancer le duel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 10 },
  sub: { color: '#444', fontSize: 16, marginBottom: 40 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#000', fontSize: 20, fontWeight: '800' },
});
