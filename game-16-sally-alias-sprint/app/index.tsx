import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>A</Text>
      </View>
      <Text style={styles.title}>Alias Sprint</Text>
      <Text style={styles.sub}>Fais-leur deviner le mot sans dire les interdits !</Text>
      
      <Pressable style={styles.btn} onPress={() => router.push('/game')}>
        <Text style={styles.btnText}>Nouvelle Partie</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF4757', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoText: { fontSize: 60, fontWeight: '900', color: '#FF4757' },
  title: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 10 },
  sub: { color: 'rgba(255,255,255,0.8)', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 60, paddingVertical: 20, borderRadius: 40, elevation: 5 },
  btnText: { color: '#FF4757', fontSize: 20, fontWeight: '800' },
});
