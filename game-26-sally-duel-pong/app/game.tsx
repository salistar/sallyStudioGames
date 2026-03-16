import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';

export default function GameScreen() {
  const { ball, p1, setP1, p2, setP2, score } = useGameLogic();

  const p1Responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => setP1(gesture.moveX - 40),
  });

  const p2Responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => setP2(gesture.moveX - 40),
  });

  return (
    <View style={styles.container}>
      <View style={styles.scoreArea}>
        <Text style={[styles.score, styles.p1Color]}>{score.p1}</Text>
        <Text style={[styles.score, styles.p2Color]}>{score.p2}</Text>
      </View>

      <View {...p1Responder.panHandlers} style={[styles.paddle, styles.p1Paddle, { left: p1 }]} />
      
      <View style={[styles.ball, { left: ball.x, top: ball.y }]} />

      <View {...p2Responder.panHandlers} style={[styles.paddle, styles.p2Paddle, { left: p2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scoreArea: { position: 'absolute', top: '50%', width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 40, marginTop: -30 },
  score: { fontSize: 60, fontWeight: '900', opacity: 0.3 },
  p1Color: { color: '#3498db' },
  p2Color: { color: '#e67e22' },
  paddle: { position: 'absolute', width: 80, height: 15, borderRadius: 10 },
  p1Paddle: { top: 40, backgroundColor: '#3498db' },
  p2Paddle: { bottom: 40, backgroundColor: '#e67e22' },
  ball: { position: 'absolute', width: 15, height: 15, backgroundColor: '#fff', borderRadius: 8 },
});
