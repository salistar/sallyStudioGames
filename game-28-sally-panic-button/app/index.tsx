import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useScore } from '../hooks/useScore';
import { CONFIG } from '../constants/config';

export default function HomeScreen() {
  const { highScore, load } = useScore();
  useEffect(() => { load(); }, []);

  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', gap:20 }}>
      <Text style={{ color: CONFIG.COLORS.text, fontSize:42, fontWeight:'800', textAlign: 'center' }}>Sally's{"\n"}Panic Button</Text>
      <Text style={{ color: CONFIG.COLORS.muted, fontSize:14 }}>réflexe / piège mental</Text>
      {highScore > 0 && <Text style={{ color: CONFIG.COLORS.warning, fontSize:22 }}>Record: {highScore}</Text>}
      <Pressable
        style={{ backgroundColor: CONFIG.COLORS.primary, paddingHorizontal:48, paddingVertical:16, borderRadius:30 }}
        onPress={() => router.push('/game')}
      >
        <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Jouer</Text>
      </Pressable>
    </View>
  );
}
