import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, level, grid, start, end, nextLevel } = useGameLogic();
  const { score, save, add } = useScore();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (phase === 'gameover') {
      save(level).then(() => {
        router.replace({ pathname: '/results', params: { score: String(score), level: String(level) } });
      });
    }
  }, [phase]);

  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', padding: 20, gap: 20 }}>
      <Text style={{ color: CONFIG.COLORS.text, fontSize:24, fontWeight: 'bold' }}>Sally's Letters</Text>
      
      <View style={{ width: '100%', aspectRatio: 0.8, backgroundColor: CONFIG.COLORS.surface, borderRadius: 15, padding: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 5 }}>
        {grid.map((row, r) => row.map((letter, c) => (
          <Pressable 
            key={`${r}-${c}`} 
            onPress={() => add(10)}
            style={{ width: '14%', aspectRatio: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: CONFIG.COLORS.primary }}
          >
            <Text style={{ color: CONFIG.COLORS.text, fontWeight: 'bold' }}>{letter}</Text>
          </Pressable>
        )))}
      </View>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Pressable 
          style={{ backgroundColor: CONFIG.COLORS.success, padding: 15, borderRadius: 10 }}
          onPress={nextLevel}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Valider Mot</Text>
        </Pressable>
        <Pressable 
          style={{ backgroundColor: CONFIG.COLORS.danger, padding: 15, borderRadius: 10 }}
          onPress={end}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fin</Text>
        </Pressable>
      </View>

      <Text style={{ color: CONFIG.COLORS.muted }}>Niveau {level} - Score: {score}</Text>
    </View>
  );
}
