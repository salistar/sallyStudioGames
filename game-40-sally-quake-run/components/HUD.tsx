import { View, Text, StyleSheet } from 'react-native';
import { CONFIG } from '../constants/config';

export const HUD = ({ time, score }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.label}>TEMPS</Text>
        <Text style={styles.value}>{Math.floor(time / 10)}s</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 60, width: '100%', flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  label: { color: CONFIG.COLORS.muted, fontSize: 10, fontWeight: '800' },
  value: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: '900' },
});
