import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export const GameUI = ({ challenge, onAction, progress }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>{challenge?.instructions}</Text>
      
      <Pressable
        onPressIn={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onAction('press');
        }}
        onPressOut={() => onAction('release')}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? CONFIG.COLORS.danger : CONFIG.COLORS.primary }
        ]}
      >
        <Text style={styles.buttonText}>PANIC</Text>
      </Pressable>

      {challenge?.type === 'tap' && (
        <Text style={styles.progress}>{progress} / {challenge.target}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 40 },
  instructions: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center', paddingHorizontal: 20 },
  button: { width: 200, height: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10 },
  buttonText: { color: '#fff', fontSize: 32, fontWeight: '900' },
  progress: { color: CONFIG.COLORS.muted, fontSize: 18 },
});
