import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function GameScreen() {
  const { current, connectedStars, isComplete, score, handleStarPress, nextConstellation } = useGameLogic();

  const onPress = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleStarPress(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relie les étoiles</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.canvas}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          {/* Lignes complètes de la constellation (cachées ou révélées) */}
          {isComplete && current.lines.map(([s1, s2], i) => {
            const star1 = current.stars.find(s => s.id === s1)!;
            const star2 = current.stars.find(s => s.id === s2)!;
            return (
              <Line
                key={i}
                x1={star1.x} y1={star1.y}
                x2={star2.x} y2={star2.y}
                stroke="#fff"
                strokeWidth="2"
                opacity="0.3"
              />
            );
          })}

          {/* Lignes tracées par le joueur */}
          {connectedStars.map((id, i) => {
            if (i === 0) return null;
            const s1 = current.stars.find(s => s.id === connectedStars[i - 1])!;
            const s2 = current.stars.find(s => s.id === id)!;
            return (
              <Line
                key={`p-${i}`}
                x1={s1.x} y1={s1.y}
                x2={s2.x} y2={s2.y}
                stroke="#FFD700"
                strokeWidth="3"
              />
            );
          })}

          {/* Étoiles */}
          {current.stars.map(star => {
            const isConnected = connectedStars.includes(star.id);
            return (
              <G key={star.id} onPress={() => onPress(star.id)}>
                <Circle
                  cx={star.x}
                  cy={star.y}
                  r={isConnected ? "8" : "6"}
                  fill={isConnected ? "#FFD700" : "#444"}
                />
              </G>
            );
          })}
        </Svg>
      </View>

      {isComplete && (
        <View style={styles.footer}>
          <Text style={styles.constName}>{current.name} !</Text>
          <Pressable style={styles.btn} onPress={nextConstellation}>
            <Text style={styles.btnText}>Suivant</Text>
          </Pressable>
        </View>
      )}

      {!isComplete && (
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>Quitter</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510', padding: 20 },
  header: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 20, fontWeight: '600' },
  score: { color: '#FFD700', fontSize: 18, fontWeight: '700' },
  canvas: { flex: 1, marginVertical: 20 },
  footer: { alignItems: 'center', marginBottom: 40 },
  constName: { color: '#FFD700', fontSize: 24, fontWeight: '800', marginBottom: 20 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 25 },
  btnText: { color: '#050510', fontWeight: '700' },
  back: { alignSelf: 'center', marginBottom: 20 },
  backText: { color: '#444' },
});
