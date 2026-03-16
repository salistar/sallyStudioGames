import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useWaveManager } from '../hooks/useWaveManager';
import { ENEMY_SIZE, COLORS } from '../constants/config';
import { router } from 'expo-router';

export default function GameScreen() {
  const { enemies, score, lives, wave, gameOver, tap } = useWaveManager();

  const handleTap = (id: number) => {
    tap(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (gameOver) {
      return (
          <View style={styles.over}>
            <Text style={styles.overText}>GAME OVER</Text>
            <Text style={styles.overSub}>Vague {wave} atteint</Text>
            <Text style={styles.finalScore}>Score: {score}</Text>
            <Pressable style={styles.retryBtn} onPress={() => router.replace('/')}>
              <Text style={styles.retryText}>Accueil</Text>
            </Pressable>
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View>
            <Text style={styles.hudLabel}>VAGUE</Text>
            <Text style={styles.hudValue}>{wave}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.hudLabel}>SCORE</Text>
            <Text style={styles.hudValue}>{score}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.hudLabel}>VIES</Text>
            <Text style={styles.hudValue}>{'❤️'.repeat(lives)}</Text>
        </View>
      </View>
      {enemies.map(e => (
        <Pressable
          key={e.id}
          style={[styles.enemy, { left: e.x - ENEMY_SIZE/2, top: e.y }]}
          onPress={() => handleTap(e.id)}
        >
          <Text style={{ fontSize: e.maxHp > 1 ? 52 : 36 }}>{e.emoji}</Text>
          {e.maxHp > 1 && (
            <View style={styles.hpBarContainer}>
                <View style={[styles.hpBar, { width: (e.hp/e.maxHp) * ENEMY_SIZE }]} />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: COLORS.background },
  hud: { flexDirection:'row', justifyContent:'space-between', padding:16, paddingTop:60, backgroundColor: 'rgba(0,0,0,0.3)' },
  hudLabel: { color: COLORS.warning, fontSize: 10, fontWeight: '800' },
  hudValue: { color: '#fff', fontSize: 18, fontWeight: '900' },
  enemy: { position:'absolute', alignItems:'center' },
  hpBarContainer: { width: ENEMY_SIZE, height: 4, backgroundColor: '#333', borderRadius: 2, marginTop: 4 },
  hpBar: { height: '100%', backgroundColor: COLORS.success, borderRadius: 2 },
  over: { flex: 1, alignItems:'center', justifyContent:'center', backgroundColor: COLORS.background, gap: 10 },
  overText: { color: COLORS.danger, fontSize: 48, fontWeight: '900' },
  overSub: { color: '#fff', fontSize: 20 },
  finalScore: { color: COLORS.warning, fontSize: 24, fontWeight: '800', marginBottom: 30 },
  retryBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  retryText: { color: '#000', fontWeight: '800' },
});
