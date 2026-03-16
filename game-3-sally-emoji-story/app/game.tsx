import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { CONFIG } from '../constants/config';
import * as Speech from 'expo-speech';

export default function GameScreen() {
  const { phase, level, currentEmojis, timer, start, end, nextLevel } = useGameLogic();
  const { score, save, add } = useScore();
  const [story, setStory] = useState('');

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

  const handleSpeak = () => {
    Speech.speak(story, { language: 'fr' });
  };

  const handleFinish = () => {
    add(200);
    nextLevel();
    setStory('');
  };

  return (
    <ScrollView contentContainerStyle={{ flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent:'center', padding: 20, gap: 20 }}>
      <Text style={{ color: CONFIG.COLORS.warning, fontSize:32, fontWeight: 'bold' }}>{timer}s</Text>
      
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {currentEmojis.map((e, i) => (
          <Text key={i} style={{ fontSize: 40 }}>{e}</Text>
        ))}
      </View>

      <TextInput
        multiline
        value={story}
        onChangeText={setStory}
        placeholder="Racontez votre histoire avec Sally..."
        placeholderTextColor={CONFIG.COLORS.muted}
        style={{ width: '100%', height: 150, backgroundColor: CONFIG.COLORS.surface, color: CONFIG.COLORS.text, padding: 15, borderRadius: 15, textAlignVertical: 'top' }}
      />

      <View style={{ flexDirection: 'row', gap: 15 }}>
        <Pressable 
          style={{ backgroundColor: CONFIG.COLORS.primary, padding: 15, borderRadius: 10 }}
          onPress={handleSpeak}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Lire (Sally)</Text>
        </Pressable>
        
        <Pressable 
          style={{ backgroundColor: CONFIG.COLORS.success, padding: 15, borderRadius: 10 }}
          onPress={handleFinish}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Terminer</Text>
        </Pressable>
      </View>

      <Text style={{ color: CONFIG.COLORS.muted }}>Niveau {level} - Score: {score}</Text>
    </ScrollView>
  );
}
