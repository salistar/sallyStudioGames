import { View, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { planets, score, spawnPlanet, sunPos } = useGameLogic();

  return (
    <Pressable 
      style={styles.container} 
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        spawnPlanet(e.nativeEvent.locationX, e.nativeEvent.locationY);
      }}
    >
      <Text style={styles.score}>Orbites: {score}</Text>
      <Svg style={StyleSheet.absoluteFill}>
        {/* SUN */}
        <Circle cx={sunPos.x} cy={sunPos.y} r={20} fill={CONFIG.COLORS.sun} />
        
        {/* PLANETS */}
        {planets.map(p => (
          <Circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.radius}
            fill={CONFIG.COLORS.planet}
          />
        ))}
      </Svg>
      <Text style={styles.hint}>Tape pour lancer une planète</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  score: { position: 'absolute', top: 60, alignSelf: 'center', color: '#fff', fontSize: 32, fontWeight: '900', zIndex: 10 },
  hint: { position: 'absolute', bottom: 40, alignSelf: 'center', color: '#444', fontSize: 14 },
});
