import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function ResultsScreen() {
  const { score, level } = useLocalSearchParams<{ score:string; level:string }>();
  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', gap:20 }}>
      <Text style={{ color: CONFIG.COLORS.primary, fontSize:24, fontWeight: 'bold' }}>Rythme perdu !</Text>
      <Text style={{ color: CONFIG.COLORS.text, fontSize:72, fontWeight:'800' }}>{score}</Text>
      <Text style={{ color: CONFIG.COLORS.muted }}>Niveau {level} atteint</Text>
      <Pressable
        style={{ backgroundColor: CONFIG.COLORS.primary, paddingHorizontal:40, paddingVertical:14, borderRadius:24 }}
        onPress={() => router.replace('/game')}
      >
        <Text style={{ color:'#fff', fontWeight:'700', fontSize:16 }}>Rejouer</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={{ color: CONFIG.COLORS.muted, fontSize:14 }}>Accueil</Text>
      </Pressable>
    </View>
  );
}
