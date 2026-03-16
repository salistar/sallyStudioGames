import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { router } from 'expo-router';

export default function GameScreen() {
  const { player, move, phase, restart } = useGameLogic();

  return (
    <View style={styles.container}>
      <View style={styles.mazeArea}>
        <View style={styles.playerPlaceholder}>
           <Text style={styles.status}>Cherche la sortie...</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => move('top')}><Text style={styles.btnText}>▲</Text></Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => move('left')}><Text style={styles.btnText}>◀</Text></Pressable>
          <View style={styles.spacer} />
          <Pressable style={styles.btn} onPress={() => move('right')}><Text style={styles.btnText}>▶</Text></Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => move('bottom')}><Text style={styles.btnText}>▼</Text></Pressable>
        </View>
      </View>

      {phase === 'won' && (
        <View style={styles.winOverlay}>
          <Text style={styles.winText}>TROUVÉ !</Text>
          <Pressable style={styles.restartBtn} onPress={restart}>
            <Text style={styles.restartText}>Continuer</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'space-around', alignItems: 'center' },
  mazeArea: { width: 300, height: 300, justifyContent: 'center', alignItems: 'center' },
  status: { color: '#333', fontSize: 18, fontWeight: '700' },
  controls: { gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  btn: { width: 80, height: 80, backgroundColor: '#111', borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  btnText: { color: '#fff', fontSize: 32 },
  spacer: { width: 80 },
  winOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  winText: { color: '#FFD700', fontSize: 48, fontWeight: '900', marginBottom: 30 },
  restartBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  restartText: { color: '#000', fontWeight: '800' },
});
