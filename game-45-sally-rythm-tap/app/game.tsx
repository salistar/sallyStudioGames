import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRythmLogic } from '../hooks/useRythmLogic';
import { NoteCircle } from '../components/NoteCircle';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function GameScreen() {
  const { notes, score, combo, tap } = useRythmLogic();

  const handleTap = (id: number) => {
    tap(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View>
            <Text style={styles.label}>COMBO</Text>
            <Text style={styles.value}>x{combo}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>SCORE</Text>
            <Text style={styles.value}>{score}</Text>
        </View>
      </View>

      {notes.map(n => (
        <NoteCircle key={n.id} note={n} onTouch={handleTap} />
      ))}

      <Pressable style={styles.back} onPress={() => router.replace('/')}>
          <Text style={styles.backText}>Quitter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  hud: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  label: { color: CONFIG.COLORS.warning, fontSize: 10, fontWeight: '800' },
  value: { color: '#fff', fontSize: 24, fontWeight: '900' },
  back: { position: 'absolute', bottom: 40, alignSelf: 'center' },
  backText: { color: '#666', fontWeight: '700' },
});
