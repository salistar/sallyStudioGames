import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useChefLogic } from '../hooks/useChefLogic';
import { OrderQueue } from '../components/OrderQueue';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function GameScreen() {
  const { orders, currentPlate, score, timeLeft, phase, addIngredient, clearPlate, serve } = useChefLogic();

  const handleIngredient = (id: string) => {
    addIngredient(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleServe = () => {
      const success = serve();
      if (success) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
  };

  if (phase === 'gameover') {
    return (
      <View style={styles.over}>
        <Text style={styles.overTitle}>SERVICE TERMINÉ !</Text>
        <Text style={styles.finalScore}>Score: {score}</Text>
        <Pressable style={styles.exitBtn} onPress={() => router.replace('/')}>
          <Text style={styles.exitText}>Terminer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
            <Text style={styles.hudLabel}>TEMPS</Text>
            <Text style={[styles.hudValue, timeLeft < 10 && { color: CONFIG.COLORS.danger }]}>{timeLeft}s</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.hudLabel}>RECETTE</Text>
            <Text style={styles.hudValue}>{score}</Text>
        </View>
      </View>

      <OrderQueue orders={orders} />

      <View style={styles.kitchen}>
        <View style={styles.plate}>
            {currentPlate.length === 0 ? (
                <Text style={styles.emptyPlate}>Choisis des ingrédients...</Text>
            ) : (
                <View style={styles.plateContent}>
                    {currentPlate.map((iid, i) => (
                        <Text key={i} style={styles.plateIng}>{CONFIG.INGREDIENTS.find(x => x.id === iid)?.emoji}</Text>
                    ))}
                </View>
            )}
        </View>

        <View style={styles.pantry}>
            {CONFIG.INGREDIENTS.map(ing => (
                <Pressable key={ing.id} style={styles.pantryBtn} onPress={() => handleIngredient(ing.id)}>
                    <Text style={styles.pantryEmoji}>{ing.emoji}</Text>
                    <Text style={styles.pantryName}>{ing.name}</Text>
                </Pressable>
            ))}
        </View>
      </View>

      <View style={styles.controls}>
          <Pressable style={styles.clearBtn} onPress={clearPlate}>
              <Text style={styles.clearText}>Vider</Text>
          </Pressable>
          <Pressable style={styles.serveBtn} onPress={handleServe}>
              <Text style={styles.serveText}>SERVIR !</Text>
          </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  hudLabel: { color: CONFIG.COLORS.primary, fontSize: 10, fontWeight: '800' },
  hudValue: { color: CONFIG.COLORS.text, fontSize: 28, fontWeight: '900' },
  kitchen: { flex: 1, padding: 20, gap: 20 },
  plate: { flex: 1, backgroundColor: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#eee' },
  emptyPlate: { color: '#ccc', fontStyle: 'italic' },
  plateContent: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  plateIng: { fontSize: 40 },
  pantry: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  pantryBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 15, alignItems: 'center', width: '30%', elevation: 2 },
  pantryEmoji: { fontSize: 32 },
  pantryName: { fontSize: 10, color: '#666', marginTop: 5 },
  controls: { flexDirection: 'row', padding: 20, gap: 15, paddingBottom: 40 },
  clearBtn: { flex: 1, backgroundColor: '#eee', padding: 18, borderRadius: 15, alignItems: 'center' },
  clearText: { color: '#666', fontWeight: '800' },
  serveBtn: { flex: 2, backgroundColor: CONFIG.COLORS.success, padding: 18, borderRadius: 15, alignItems: 'center' },
  serveText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  over: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: CONFIG.COLORS.background, gap: 10 },
  overTitle: { color: CONFIG.COLORS.primary, fontSize: 32, fontWeight: '900' },
  finalScore: { fontSize: 64, fontWeight: '900', color: CONFIG.COLORS.text },
  exitBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, marginTop: 20 },
  exitText: { color: '#fff', fontWeight: '800' },
});
