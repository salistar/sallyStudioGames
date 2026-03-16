import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, day, prices, inventory, setInventory, start, nextDay } = useGameLogic();
  const { cash, save, add } = useScore();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (phase === 'gameover') {
      save().then(() => {
        router.replace({ pathname: '/results', params: { score: String(cash) } });
      });
    }
  }, [phase]);

  const handleBuy = (goodId: string, price: number) => {
    if (cash >= price) {
      add(-price);
      setInventory(prev => ({ ...prev, [goodId]: (prev[goodId] || 0) + 1 }));
    }
  };

  const handleSell = (goodId: string, price: number) => {
    if (inventory[goodId] > 0) {
      add(price);
      setInventory(prev => ({ ...prev, [goodId]: prev[goodId] - 1 }));
    }
  };

  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, padding: 20, paddingTop: 60 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={{ color: CONFIG.COLORS.text, fontSize: 18 }}>Jour {day} / 30</Text>
        <Text style={{ color: CONFIG.COLORS.success, fontSize: 18, fontWeight: 'bold' }}>{cash} DH</Text>
      </View>

      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {CONFIG.GOODS.map(g => (
          <View key={g.id} style={{ backgroundColor: CONFIG.COLORS.surface, padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: CONFIG.COLORS.text, fontWeight: 'bold' }}>{g.name}</Text>
              <Text style={{ color: CONFIG.COLORS.muted }}>Prix: {prices[g.id]} DH | Stock: {inventory[g.id] || 0}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => handleBuy(g.id, prices[g.id])} style={{ backgroundColor: CONFIG.COLORS.primary, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>Acheter</Text>
              </Pressable>
              <Pressable onPress={() => handleSell(g.id, prices[g.id])} style={{ backgroundColor: CONFIG.COLORS.warning, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>Vendre</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable 
        style={{ backgroundColor: CONFIG.COLORS.success, padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' }}
        onPress={nextDay}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Terminer Journée</Text>
      </Pressable>
    </View>
  );
}
