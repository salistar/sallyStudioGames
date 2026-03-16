import { View, Text, StyleSheet } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { phase, level, tilt, start, end } = useGameLogic();
  const { score, save } = useScore();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (phase === 'gameover') {
      save(level).then(() => {
        router.replace({ pathname: '/results', params: { score: String(score), level: String(level) } });
      });
    }
  }, [phase, score, level, save]);

  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center' }}>
      <View style={{ position: 'absolute', top: 60, alignItems: 'center' }}>
        <Text style={{ color:'#fff', fontSize:24, fontWeight: 'bold' }}>Topple Tower</Text>
        <Text style={{ color: CONFIG.COLORS.muted }}>Inclinaison: {(tilt * 90).toFixed(1)}°</Text>
      </View>
      
      <View style={{ width: 100, height: 200, backgroundColor: CONFIG.COLORS.surface, borderRadius: 10, transform: [{ rotate: `${tilt * 45}deg` }] }}>
        <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 40, backgroundColor: CONFIG.COLORS.primary }} />
        <View style={{ position: 'absolute', bottom: 40, width: '90%', left: '5%', height: 40, backgroundColor: CONFIG.COLORS.success }} />
        <View style={{ position: 'absolute', bottom: 80, width: '80%', left: '10%', height: 40, backgroundColor: CONFIG.COLORS.warning }} />
      </View>

      <View style={{ position: 'absolute', bottom: 60 }}>
        <Text style={{ color:'#fff', fontSize:18 }}>Niveau {level} - Score: {score}</Text>
      </View>
    </View>
  );
}
