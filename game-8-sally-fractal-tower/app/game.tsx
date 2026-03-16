import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, blocks, currentX, width, start, place } = useGameLogic();
  const { score, save, add } = useScore();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (phase === 'gameover') {
      save().then(() => {
        router.replace({ pathname: '/results', params: { score: String(score) } });
      });
    }
  }, [phase]);

  const handlePlace = () => {
    place();
    add(10);
  };

  return (
    <Pressable style={{ flex:1, backgroundColor: CONFIG.COLORS.background }} onPress={handlePlace}>
      <View style={{ padding: 60, alignItems: 'center' }}>
        <Text style={{ color: CONFIG.COLORS.text, fontSize: 24, fontWeight: 'bold' }}>Score: {score}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 50 }}>
        {blocks.map(b => (
          <View key={b.id} style={{ position: 'absolute', bottom: b.y, left: b.x, width: b.width, height: 30, backgroundColor: CONFIG.COLORS.primary, borderRadius: 5 }} />
        ))}
        {phase === 'playing' && (
          <View style={{ position: 'absolute', bottom: blocks.length * 30, left: currentX, width: width, height: 30, backgroundColor: CONFIG.COLORS.success, borderRadius: 5 }} />
        )}
      </View>
    </Pressable>
  );
}
