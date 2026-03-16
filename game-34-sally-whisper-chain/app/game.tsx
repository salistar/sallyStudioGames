import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { story, phase, currentPlayer, start, addPhrase, readStory } = useGameLogic();
  const [input, setInput] = useState('');

  if (phase === 'setup') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Combien de joueurs ?</Text>
        {[2, 3, 4, 5].map(n => (
          <Pressable key={n} style={styles.setupBtn} onPress={() => start(n)}>
            <Text style={styles.btnText}>{n} Joueurs</Text>
          </Pressable>
        ))}
      </View>
    );
  }

  if (phase === 'end') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>L'histoire complète</Text>
        <ScrollView style={styles.storyScroll}>
          <Text style={styles.fullStory}>{story.join(' ')}</Text>
        </ScrollView>
        <Pressable style={styles.actionBtn} onPress={readStory}>
          <Text style={styles.btnText}>Lire à voix haute 🔊</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, { marginTop: 10 }]} onPress={() => start(3)}>
          <Text style={styles.btnText}>Nouvelle partie</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.playerLabel}>Joueur {currentPlayer + 1}</Text>
      
      {story.length > 0 && (
          <View style={styles.previousWrap}>
              <Text style={styles.hint}>Dernière phrase :</Text>
              <Text style={styles.previous}>{story[story.length - 1]}</Text>
          </View>
      )}

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ajoute ta suite..."
        placeholderTextColor="#666"
        multiline
      />

      <Pressable 
        style={styles.actionBtn} 
        onPress={() => {
          if (input.trim()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            addPhrase(input);
            setInput('');
          }
        }}
      >
        <Text style={styles.btnText}>Suivant</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, padding: 30, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 30, textAlign: 'center' },
  setupBtn: { backgroundColor: CONFIG.COLORS.primary, padding: 15, borderRadius: 15, marginBottom: 10, alignItems: 'center' },
  playerLabel: { color: CONFIG.COLORS.primary, fontSize: 32, fontWeight: '900', marginBottom: 20 },
  previousWrap: { backgroundColor: '#1e272e', padding: 20, borderRadius: 15, marginBottom: 20 },
  hint: { color: CONFIG.COLORS.muted, fontSize: 12, marginBottom: 5 },
  previous: { color: '#fff', fontSize: 18, fontStyle: 'italic' },
  input: { flex: 0.3, backgroundColor: '#fff', borderRadius: 15, padding: 20, fontSize: 18, textAlignVertical: 'top', marginBottom: 20 },
  actionBtn: { backgroundColor: CONFIG.COLORS.success, padding: 18, borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#000', fontSize: 18, fontWeight: '800' },
  storyScroll: { flex: 1, marginVertical: 20 },
  fullStory: { color: '#fff', fontSize: 20, lineHeight: 30 },
});
