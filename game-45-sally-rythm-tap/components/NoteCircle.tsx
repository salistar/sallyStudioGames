import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { CONFIG } from '../constants/config';

export const NoteCircle = ({ note, onTouch }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = Math.max(0, 1 + (note.time - Date.now()) / 1000);
    return {
      transform: [{ scale }],
      opacity: note.hit ? 0 : 1,
    };
  });

  return (
    <View style={[styles.container, { left: note.x - CONFIG.NOTE_SIZE/2, top: note.y - CONFIG.NOTE_SIZE/2 }]}>
      <Pressable onPress={() => onTouch(note.id)}>
          <View style={styles.ring} />
          <Animated.View style={[styles.circle, animatedStyle]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', width: CONFIG.NOTE_SIZE, height: CONFIG.NOTE_SIZE },
  circle: { width: '100%', height: '100%', borderRadius: CONFIG.NOTE_SIZE/2, backgroundColor: CONFIG.COLORS.primary, opacity: 0.6 },
  ring: { position: 'absolute', width: '100%', height: '100%', borderRadius: CONFIG.NOTE_SIZE/2, borderWidth: 2, borderColor: '#fff' },
});
