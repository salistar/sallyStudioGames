import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export const HUD = ({ moves, maxMoves, onFlood }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.statsLabel}>MOVES</Text>
        <Text style={[styles.statsValue, moves >= maxMoves && { color: CONFIG.COLORS.danger }]}>
          {moves} / {maxMoves}
        </Text>
      </View>
      <View style={styles.palette}>
        {CONFIG.FLOOD_COLORS.map(color => (
          <Pressable
            key={color}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onFlood(color);
            }}
            style={[styles.colorBtn, { backgroundColor: color }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', gap: 30, paddingBottom: 40 },
  stats: { alignItems: 'center' },
  statsLabel: { color: CONFIG.COLORS.muted, fontSize: 12, fontWeight: '800' },
  statsValue: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: '900' },
  palette: { flexDirection: 'row', gap: 10 },
  colorBtn: { width: 45, height: 45, borderRadius: 25, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)' },
});
