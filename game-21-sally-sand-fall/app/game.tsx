import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useEffect, useRef } from 'react';
import { Canvas, Rect, Group } from '@shopify/react-native-skia';
import { GRID_W, GRID_H, COLORS } from '../constants/grid';

const { width } = Dimensions.get('window');
const CELL_SIZE = width / GRID_W;

export default function GameScreen() {
  const { grid, brushType, setBrushType, updateGrid, addParticle, clear } = useGameLogic();
  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(updateGrid, 50);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleTouch = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    addParticle(locationX, locationY);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sand Fall</Text>
        <Pressable onPress={clear}><Text style={styles.clear}>RESET</Text></Pressable>
      </View>

      <View style={styles.canvasArea} onTouchMove={handleTouch} onTouchStart={handleTouch}>
        <Canvas style={styles.canvas}>
          {grid.map((p, i) => {
            if (p === 'empty') return null;
            const x = (i % GRID_W) * CELL_SIZE;
            const y = Math.floor(i / GRID_W) * CELL_SIZE;
            return <Rect key={i} x={x} y={y} width={CELL_SIZE} height={CELL_SIZE} color={COLORS[p]} />;
          })}
        </Canvas>
      </View>

      <View style={styles.footer}>
        {(['sand', 'water', 'wall'] as const).map(t => (
          <Pressable 
            key={t} 
            style={[styles.brush, brushType === t && styles.activeBrush]} 
            onPress={() => setBrushType(t)}
          >
            <Text style={[styles.brushText, brushType === t && styles.activeBrushText]}>{t.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  clear: { color: '#e74c3c', fontWeight: '700' },
  canvasArea: { flex: 1 },
  canvas: { flex: 1 },
  footer: { flexDirection: 'row', padding: 20, gap: 10, justifyContent: 'center' },
  brush: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#222' },
  activeBrush: { backgroundColor: '#fff' },
  brushText: { color: '#888', fontWeight: '700' },
  activeBrushText: { color: '#000' },
});
