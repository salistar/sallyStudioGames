import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Svg, { Rect, TSpan, Text as SvgText } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');
const GRID_WIDTH = width - 40;
const CELL_SIZE = GRID_WIDTH / CONFIG.GRID_SIZE;

export const WordGrid = ({ grid, currentStroke, onMove, onEnd }: any) => {
  const onGesture = (e: any) => {
    const r = Math.floor(e.nativeEvent.y / CELL_SIZE);
    const c = Math.floor(e.nativeEvent.x / CELL_SIZE);
    if (r >= 0 && r < CONFIG.GRID_SIZE && c >= 0 && c < CONFIG.GRID_SIZE) {
        onMove(r, c);
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={onEnd}>
        <View style={{ width: GRID_WIDTH, height: GRID_WIDTH }}>
          <Svg width={GRID_WIDTH} height={GRID_WIDTH}>
            {grid.map((row: string[], r: number) => row.map((char: string, c: number) => {
              const isActive = currentStroke.some(([sr, sc]: [number, number]) => sr === r && sc === c);
              return (
                <View key={`${r}-${c}`}>
                  <Rect
                    x={c * CELL_SIZE}
                    y={r * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    fill={isActive ? CONFIG.COLORS.primary : 'transparent'}
                    stroke={CONFIG.COLORS.surface}
                    strokeWidth={0.5}
                  />
                  <SvgText
                    x={c * CELL_SIZE + CELL_SIZE/2}
                    y={r * CELL_SIZE + CELL_SIZE/2 + 6}
                    fontSize={18}
                    fontWeight="800"
                    fill={isActive ? '#fff' : CONFIG.COLORS.text}
                    textAnchor="middle"
                  >
                    {char}
                  </SvgText>
                </View>
              );
            }))}
          </Svg>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: GRID_WIDTH, height: GRID_WIDTH, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, overflow: 'hidden' },
});
