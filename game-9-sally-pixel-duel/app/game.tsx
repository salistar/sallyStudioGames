import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { useEffect } from 'react';

export default function GameScreen() {
  const { grid, turn, winner, claim, start } = useGameLogic();

  useEffect(() => { start(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixel Duel</Text>
      <Text style={{ color: turn === 1 ? CONFIG.COLORS.player1 : CONFIG.COLORS.player2, fontSize: 18, marginBottom: 20 }}>
        Tour: Joueur {turn}
      </Text>

      <View style={styles.grid}>
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => (
              <Pressable
                key={c}
                onPress={() => claim(r, c)}
                style={[
                  styles.cell,
                  { backgroundColor: cell === 1 ? CONFIG.COLORS.player1 : cell === 2 ? CONFIG.COLORS.player2 : CONFIG.COLORS.neutral }
                ]}
              />
            ))}
          </View>
        ))}
      </View>

      {winner !== 0 && (
        <View style={styles.winnerBox}>
          <Text style={styles.winnerText}>Le Joueur {winner} GAGNE !</Text>
          <Pressable onPress={start} style={styles.btn}>
            <Text style={styles.btnText}>Rejouer</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent: 'center' },
  title: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  grid: { width: 300, height: 300, backgroundColor: CONFIG.COLORS.neutral, padding: 5, gap: 2 },
  row: { flex: 1, flexDirection: 'row', gap: 2 },
  cell: { flex: 1, borderRadius: 2 },
  winnerBox: { marginTop: 20, alignItems: 'center' },
  winnerText: { color: CONFIG.COLORS.text, fontSize: 24, fontWeight: 'bold' },
  btn: { marginTop: 20, backgroundColor: CONFIG.COLORS.player1, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
