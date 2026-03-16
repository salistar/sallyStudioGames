import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { GRID_SIZE } from '../constants/grid';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { grid, isWon, initGrid, rotateTile, checkPath } = useGameLogic();

  useEffect(() => {
    initGrid();
  }, []);

  const handlePress = (x: number, y: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    rotateTile(x, y);
    checkPath();
  };

  const renderPipe = (type: string, rotation: number) => {
    // Visual representation of pipes
    if (type === 'start') return '🚀';
    if (type === 'end') return '🏁';
    if (type === 'straight') return '║';
    if (type === 'corner') return '╗';
    return '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pipe Dream 3D</Text>
      
      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <View key={y} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, x) => {
              const tile = grid.find(t => t.x === x && t.y === y);
              if (!tile) return null;
              return (
                <Pressable 
                  key={x} 
                  style={[styles.tile, { transform: [{ rotate: `${tile.rotation}deg` }] }]}
                  onPress={() => handlePress(x, y)}
                >
                  <Text style={styles.pipeText}>{renderPipe(tile.type, tile.rotation)}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {isWon && <Text style={styles.win}>Connecté !</Text>}

      <Pressable style={styles.reset} onPress={initGrid}>
        <Text style={styles.resetText}>Nouveau Niveau</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#e94560', fontSize: 32, fontWeight: '800', marginBottom: 30 },
  grid: { padding: 10, backgroundColor: '#16213e', borderRadius: 15 },
  row: { flexDirection: 'row' },
  tile: { width: 45, height: 45, backgroundColor: '#0f3460', margin: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  pipeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  win: { color: '#4ecca3', fontSize: 24, fontWeight: '800', marginTop: 20 },
  reset: { marginTop: 40, backgroundColor: '#e94560', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  resetText: { color: '#fff', fontWeight: '700' },
});
