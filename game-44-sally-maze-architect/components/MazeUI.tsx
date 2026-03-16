import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');
const GRID_WIDTH = width - 40;
const CELL_SIZE = GRID_WIDTH / CONFIG.GRID_SIZE;

export const MazeUI = ({ grid, onMove }: any) => {
  const onGesture = (e: any) => {
    const r = Math.floor(e.nativeEvent.y / CELL_SIZE);
    const c = Math.floor(e.nativeEvent.x / CELL_SIZE);
    onMove(r, c);
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGesture}>
        <View style={{ width: GRID_WIDTH, height: GRID_WIDTH }}>
          <Svg width={GRID_WIDTH} height={GRID_WIDTH}>
            {grid.map((row: any[], r: number) => row.map((cell: string, c: number) => (
              <Rect
                key={`${r}-${c}`}
                x={c * CELL_SIZE}
                y={r * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={
                  cell === 'wall' ? '#333' :
                  cell === 'start' ? CONFIG.COLORS.success :
                  cell === 'end' ? CONFIG.COLORS.danger :
                  cell === 'path' ? CONFIG.COLORS.primary :
                  '#1a1a2e'
                }
                stroke="#000"
                strokeWidth={0.5}
              />
            )))}
          </Svg>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: GRID_WIDTH, height: GRID_WIDTH, backgroundColor: '#000', borderRadius: 8, overflow: 'hidden' },
});
