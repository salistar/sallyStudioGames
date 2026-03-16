import { View, StyleSheet, Pressable, Text } from 'react-native';
import Svg, { Polyline, G } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { CONFIG } from '../constants/config';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CANVAS_SIZE = width;
const CX = CANVAS_SIZE / 2;
const CY = CANVAS_SIZE / 2;

export const GameUI = ({ lines, currentLine, color, mode, onAddPoint, onEndLine }: any) => {
  const renderLine = (pts: any[], color: string, thickness: number, keyPrefix: string) => {
    const pointsStr = pts.map((p: any) => `${p.x},${p.y}`).join(' ');
    
    return (
      <G key={keyPrefix}>
        <Polyline points={pointsStr} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        {mode === 'axial' && (
          <Polyline points={pts.map((p: any) => `${CANVAS_SIZE - p.x},${p.y}`).join(' ')} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        )}
        {mode === 'radial' && (
          <Polyline points={pts.map((p: any) => `${CANVAS_SIZE - p.x},${CANVAS_SIZE - p.y}`).join(' ')} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        )}
        {mode === 'kaleidoscope' && [
            pts.map((p: any) => `${CANVAS_SIZE - p.x},${p.y}`).join(' '),
            pts.map((p: any) => `${p.x},${CANVAS_SIZE - p.y}`).join(' '),
            pts.map((p: any) => `${CANVAS_SIZE - p.x},${CANVAS_SIZE - p.y}`).join(' ')
        ].map((s, i) => (
            <Polyline key={i} points={s} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </G>
    );
  };

  const onGestureEvent = (e: any) => {
    const { x, y } = e.nativeEvent;
    if (x >= 0 && x <= CANVAS_SIZE && y >= 0 && y <= CANVAS_SIZE) {
      onAddPoint({ x, y });
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onEndLine}>
        <View style={styles.canvas}>
          <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
            {lines.map((l: any, i: number) => renderLine(l.points, l.color, l.thickness, `line-${i}`))}
            {currentLine && renderLine(currentLine, color, 4, 'current')}
          </Svg>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#000' },
  canvas: { width: CANVAS_SIZE, height: CANVAS_SIZE, backgroundColor: CONFIG.COLORS.surface, borderWidth: 1, borderColor: '#333' },
});
