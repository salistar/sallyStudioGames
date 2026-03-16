import { View, StyleSheet, Text, PanResponder } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { shapes, score, slice } = useGameLogic();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      shapes.forEach(s => {
        if (!s.sliced && 
            gesture.moveX > s.x && gesture.moveX < s.x + s.size &&
            gesture.moveY > s.y && gesture.moveY < s.y + s.size) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          slice(s.id);
        }
      });
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.score}>Score: {score}</Text>
      <Svg style={StyleSheet.absoluteFill}>
        {shapes.map(s => (
          <Rect
            key={s.id}
            x={s.x}
            y={s.y}
            width={s.size}
            height={s.size}
            fill={s.sliced ? 'transparent' : CONFIG.COLORS.primary}
            stroke={CONFIG.COLORS.primary}
            strokeWidth={2}
            opacity={s.sliced ? 0.3 : 1}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  score: { position: 'absolute', top: 60, right: 30, color: '#fff', fontSize: 32, fontWeight: '900', zIndex: 10 },
});
