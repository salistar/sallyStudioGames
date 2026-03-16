import { View, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';

const CELL = 30;

export default function GameScreen() {
  const { agent, guards, walls, goal, phase, moveAgent } = useGameLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{phase.toUpperCase()}</Text>

      <View style={styles.board}>
        <Svg width={CONFIG.GRID_SIZE * CELL} height={CONFIG.GRID_SIZE * CELL}>
          {/* WALLS */}
          {walls.map((w, i) => <Rect key={i} x={w.x * CELL} y={w.y * CELL} width={CELL} height={CELL} fill={CONFIG.COLORS.wall} />)}
          
          {/* GOAL */}
          <Rect x={goal.x * CELL} y={goal.y * CELL} width={CELL} height={CELL} fill={CONFIG.COLORS.goal} opacity={0.6} />
          
          {/* GUARDS */}
          {guards.map((g, i) => (
              <Circle key={i} cx={g.pos.x * CELL + CELL / 2} cy={g.pos.y * CELL + CELL / 2} r={CELL / 3} fill={CONFIG.COLORS.guard} />
          ))}

          {/* AGENT */}
          <Circle cx={agent.x * CELL + CELL / 2} cy={agent.y * CELL + CELL / 2} r={CELL / 2.5} fill={CONFIG.COLORS.agent} />
        </Svg>
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => moveAgent({ x: 0, y: -1 })}><Text style={styles.btnText}>▲</Text></Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => moveAgent({ x: -1, y: 0 })}><Text style={styles.btnText}>◀</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => moveAgent({ x: 1, y: 0 })}><Text style={styles.btnText}>▶</Text></Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => moveAgent({ x: 0, y: 1 })}><Text style={styles.btnText}>▼</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center' },
  status: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 20 },
  board: { borderWidth: 2, borderColor: '#333', padding: 2 },
  controls: { marginTop: 40, gap: 10 },
  row: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  btn: { width: 60, height: 60, backgroundColor: '#333', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 20 },
});
