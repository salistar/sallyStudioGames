import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, level, room, start, end, nextRoom } = useGameLogic();
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
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', gap: 20 }}>
      <Text style={{ color:'#fff', fontSize:24, fontWeight: 'bold' }}>Salle {room} / 5</Text>
      <Text style={{ color: CONFIG.COLORS.muted, fontSize:18 }}>Niveau {level} - Score: {score}</Text>
      
      <View style={{ width: 300, height: 300, backgroundColor: CONFIG.COLORS.surface, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: CONFIG.COLORS.primary }}>
        <Text style={{ color: CONFIG.COLORS.text }}>[ Vue de la Salle {room} ]</Text>
        <Text style={{ color: CONFIG.COLORS.warning, marginTop: 10 }}>Sally vous surveille...</Text>
      </View>

      <Pressable 
        style={{ backgroundColor: CONFIG.COLORS.success, padding: 15, borderRadius: 10 }}
        onPress={() => {
          add(100);
          nextRoom();
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Interagir / Suivant</Text>
      </Pressable>

      <Pressable 
        style={{ backgroundColor: CONFIG.COLORS.danger, padding: 15, borderRadius: 10 }}
        onPress={end}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Abandonner</Text>
      </Pressable>
    </View>
  );
}
