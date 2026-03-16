import { View, Text, StyleSheet } from 'react-native';
import { CONFIG } from '../constants/config';

export const HUD = ({ score, level }: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Lvl {level}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 50, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  label: { color: CONFIG.COLORS.muted, fontSize: 12, fontWeight: '700' },
  value: { color: CONFIG.COLORS.text, fontSize: 28, fontWeight: '900' },
  levelContainer: { backgroundColor: CONFIG.COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  levelText: { color: CONFIG.COLORS.warning, fontWeight: '800' },
});
