import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎵</Text>
      <Text style={styles.title}>Sally's{"\n"}Beat Builder</Text>
      <Pressable
        style={styles.btn}
        onPress={() => router.push('/game')}
      >
        <Text style={styles.btnText}>Créer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', gap: 30 },
  logo: { fontSize: 80 },
  title: { color: CONFIG.COLORS.text, fontSize: 36, fontWeight: '900', textAlign: 'center' },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 48, paddingVertical: 18, borderRadius: 30 },
  btnText: { color: '#000', fontSize: 20, fontWeight: '800' },
});
