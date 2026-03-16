import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>👨‍🍳</Text>
      <Text style={styles.title}>Sally's{"\n"}Chrono Chef</Text>
      <Text style={styles.subtitle}>Gestion / Cuisine</Text>
      
      <Pressable
        style={styles.btn}
        onPress={() => router.push('/game')}
      >
        <Text style={styles.btnText}>Cuisiner !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 20 },
  logo: { fontSize: 80, marginBottom: 10 },
  title: { color: CONFIG.COLORS.text, fontSize: 42, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: CONFIG.COLORS.primary, fontSize: 16, marginBottom: 20 },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 60, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
