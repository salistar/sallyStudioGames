import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function HomeScreen() {
  return (
    <View style={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', gap:20 }}>
      <Text style={{ color: CONFIG.COLORS.text, fontSize:42, fontWeight:'800' }}>Sally's Lingo</Text>
      <Text style={{ color: CONFIG.COLORS.muted, fontSize:14 }}>wordle local</Text>
      <Pressable
        style={{ backgroundColor: CONFIG.COLORS.primary, paddingHorizontal:48, paddingVertical:16, borderRadius:30 }}
        onPress={() => router.push('/game')}
      >
        <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Jouer</Text>
      </Pressable>
      <Text style={{ color: CONFIG.COLORS.muted, fontStyle: 'italic', marginTop: 20 }}>{CONFIG.SALLY_MESSAGE}</Text>
    </View>
  );
}
