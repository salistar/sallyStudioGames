import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { CONFIG } from '../constants/config';

export const OrderQueue = ({ orders }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {orders.map((o: any) => (
          <View key={o.id} style={styles.order}>
            <Text style={styles.recipeName}>{o.recipe.name}</Text>
            <View style={styles.ingredients}>
              {o.recipe.items.map((iid: string, i: number) => {
                const ing = CONFIG.INGREDIENTS.find(x => x.id === iid);
                return <Text key={i} style={styles.ingEmoji}>{ing?.emoji}</Text>;
              })}
            </View>
            <View style={styles.timer}>
                <View style={[styles.timerBar, { width: (o.timeRemaining / 15) * 100 + '%', backgroundColor: o.timeRemaining < 5 ? CONFIG.COLORS.danger : CONFIG.COLORS.warning }]} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 120, backgroundColor: 'rgba(0,0,0,0.05)', paddingVertical: 10 },
  scroll: { paddingHorizontal: 16, gap: 12 },
  order: { backgroundColor: '#fff', padding: 10, borderRadius: 12, width: 120, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  recipeName: { fontSize: 12, fontWeight: '800', color: CONFIG.COLORS.text },
  ingredients: { flexDirection: 'row', gap: 4, marginVertical: 6 },
  ingEmoji: { fontSize: 16 },
  timer: { height: 4, backgroundColor: '#eee', borderRadius: 2, overflow: 'hidden' },
  timerBar: { height: '100%' },
});
