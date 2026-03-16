import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { KNOT_SEGMENTS } from '../constants/knot';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { rotations, isSolved, rotateSegment } = useGameLogic();

  const handlePress = (id: number) => {
    if (isSolved) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    rotateSegment(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinity Knot</Text>
      <Text style={styles.sub}>Aligne les segments pour fermer la boucle</Text>

      <View style={styles.board}>
        <Svg width="300" height="300" viewBox="0 0 300 300">
          {KNOT_SEGMENTS.map(seg => (
            <G 
              key={seg.id} 
              onPress={() => handlePress(seg.id)}
              transform={`rotate(${rotations[seg.id]}, 150, 150)`}
            >
              <Path
                d={seg.points}
                stroke={isSolved ? "#00FFCC" : "#fff"}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
            </G>
          ))}
        </Svg>
      </View>

      {isSolved && <Text style={styles.win}>Boucle infinie créée !</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 32, fontWeight: '900', marginBottom: 10 },
  sub: { color: '#444', fontSize: 14, marginBottom: 50, textAlign: 'center' },
  board: { width: 300, height: 300, backgroundColor: '#111', borderRadius: 150, padding: 20, elevation: 10 },
  win: { color: '#00FFCC', fontSize: 24, fontWeight: '800', marginTop: 40 },
});
