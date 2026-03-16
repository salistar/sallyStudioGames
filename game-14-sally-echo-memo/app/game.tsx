import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSequence } from '../hooks/useSequence';
import { useHighScore } from '../hooks/useHighScore';
import { TileButton } from '../components/TileButton';
import { useEffect } from 'react';

export default function GameScreen() {
  const { sequence, activeTile, phase, round, startGame, handlePlayerTap } = useSequence();
  const { saveScore } = useHighScore();

  useEffect(() => {
    if (phase === 'failed') saveScore(round - 1);
  }, [phase]);

  const messages: Record<string, string> = {
    idle: 'Appuie pour commencer',
    showing: 'Mémorise...',
    input: 'À toi !',
    success: '✓ Bien joué !',
    failed: `Game Over — Round ${round - 1}`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.round}>Round {round}</Text>
      <Text style={styles.status}>{messages[phase]}</Text>

      <View style={styles.grid}>
        {[0, 1].map(row => (
          <View key={row} style={styles.row}>
            {[0, 1].map(col => {
              const id = row * 2 + col;
              return (
                <TileButton
                  key={id}
                  tileId={id}
                  isActive={activeTile === id}
                  onPress={handlePlayerTap}
                  disabled={phase !== 'input'}
                />
              );
            })}
          </View>
        ))}
      </View>

      {(phase === 'idle' || phase === 'failed') && (
        <Pressable style={styles.btn} onPress={startGame}>
          <Text style={styles.btnText}>
            {phase === 'failed' ? 'Rejouer' : 'Jouer'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', padding: 20 },
  round: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  status: { color: '#aaa', fontSize: 16, marginBottom: 24, height: 24 },
  grid: { width: '100%', aspectRatio: 1, maxWidth: 360 },
  row: { flex: 1, flexDirection: 'row' },
  btn: { marginTop: 32, backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30 },
  btnText: { color: '#111', fontSize: 18, fontWeight: '600' },
});
