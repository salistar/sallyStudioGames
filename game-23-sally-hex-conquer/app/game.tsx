import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Svg, { Polygon, G } from 'react-native-svg';
import { useGameLogic } from '../hooks/useGameLogic';
import { BOARD_RADIUS } from '../constants/board';

const { width } = Dimensions.get('window');
const HEX_SIZE = width / 10;

export default function GameScreen() {
  const { board, turn, handleClick } = useGameLogic();

  const getHexPoints = (x: number, y: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
    }
    return points.join(' ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hex Conquer</Text>
      <Text style={styles.turn}>{turn === 'player' ? 'À toi !' : 'IA réfléchit...'}</Text>

      <View style={styles.board}>
        <Svg width={width} height={width}>
          <G transform={`translate(${width / 2}, ${width / 2})`}>
            {board.map(h => {
              const x = HEX_SIZE * (3/2 * h.q);
              const y = HEX_SIZE * (Math.sqrt(3)/2 * h.q + Math.sqrt(3) * h.r);
              const colors = { none: '#222', player: '#3498db', ai: '#e74c3c' };
              
              return (
                <Polygon
                  key={`${h.q},${h.r}`}
                  points={getHexPoints(x, y, HEX_SIZE - 2)}
                  fill={colors[h.owner]}
                  onPress={() => handleClick(h.q, h.r)}
                />
              );
            })}
          </G>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 32, fontWeight: '900', marginBottom: 10 },
  turn: { color: '#888', marginBottom: 30 },
  board: { width: '100%', aspectRatio: 1 },
});
