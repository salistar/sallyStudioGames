import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');
const GRID_WIDTH = width - 40;
const CELL_SIZE = GRID_WIDTH / CONFIG.GRID_SIZE;

export const GameUI = ({ grid }: { grid: string[][] }) => {
  return (
    <View style={styles.container}>
      {grid.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((color, c) => (
            <View key={c} style={[styles.cell, { backgroundColor: color }]} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: GRID_WIDTH, height: GRID_WIDTH, backgroundColor: '#333', borderRadius: 8, overflow: 'hidden' },
  row: { flexDirection: 'row' },
  cell: { width: CELL_SIZE, height: CELL_SIZE },
});
