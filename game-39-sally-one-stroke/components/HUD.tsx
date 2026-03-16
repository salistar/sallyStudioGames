import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CONFIG } from '../constants/config';

export const HUD = ({ level, score, onReset }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.label}>NIVEAU</Text>
        <Text style={styles.value}>{level}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.score}>{score}</Text>
      </View>
      <Pressable style={styles.resetBtn} onPress={onReset}>
        <Text style={styles.resetText}>🔄 Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20, paddingTop: 60 },
  left: { alignItems: 'flex-start' },
  label: { color: CONFIG.COLORS.muted, fontSize: 10, fontWeight: '800' },
  value: { color: CONFIG.COLORS.text, fontSize: 24, fontWeight: '900' },
  center: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  score: { color: CONFIG.COLORS.warning, fontSize: 32, fontWeight: '900' },
  resetBtn: { padding: 10, backgroundColor: CONFIG.COLORS.surface, borderRadius: 10 },
  resetText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
