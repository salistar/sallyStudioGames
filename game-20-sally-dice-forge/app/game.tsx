import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { dice, hp, enemyHp, logs, rollDice, forgeDie } = useGameLogic();

  const handleRoll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    rollDice();
  };

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Toi</Text>
          <Text style={styles.statVal}>{hp} HP</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Ennemi</Text>
          <Text style={styles.statVal}>{enemyHp} HP</Text>
        </View>
      </View>

      <ScrollView style={styles.logArea}>
        {logs.map((log, i) => (
          <Text key={i} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>

      <View style={styles.diceArea}>
        {dice.map(d => (
          <View key={d.id} style={styles.die}>
            <Text style={styles.dieType}>{d.type === 'attack' ? '⚔️' : '🛡️'}</Text>
            <View style={styles.sides}>
              {d.sides.map((s, i) => (
                <View key={i} style={styles.side}><Text style={styles.sideText}>{s}</Text></View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <Pressable style={styles.rollBtn} onPress={handleRoll} disabled={hp <= 0 || enemyHp <= 0}>
        <Text style={styles.rollBtnText}>Lancer les dés</Text>
      </Pressable>

      {(hp <= 0 || enemyHp <= 0) && (
        <Text style={styles.gameOver}>{enemyHp <= 0 ? 'Victoire !' : 'Défaite...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', padding: 20 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center' },
  statBox: { alignItems: 'center' },
  statLabel: { color: '#888', textTransform: 'uppercase', fontSize: 12 },
  statVal: { color: '#fff', fontSize: 24, fontWeight: '800' },
  vs: { color: '#444', fontWeight: '900' },
  logArea: { flex: 1, marginVertical: 20, backgroundColor: '#111', borderRadius: 10, padding: 15 },
  logText: { color: '#aaa', fontSize: 14, marginBottom: 5 },
  diceArea: { gap: 15, marginBottom: 20 },
  die: { backgroundColor: '#2a2a2a', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 15 },
  dieType: { fontSize: 24 },
  sides: { flexDirection: 'row', gap: 5, flexWrap: 'wrap', flex: 1 },
  side: { width: 30, height: 30, backgroundColor: '#3a3a3a', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  sideText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  rollBtn: { backgroundColor: '#e67e22', padding: 18, borderRadius: 12, alignItems: 'center' },
  rollBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  gameOver: { color: '#fff', fontSize: 32, fontWeight: '900', textAlign: 'center', marginTop: 20 },
});
