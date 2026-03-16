import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { useState } from 'react';
import { router } from 'expo-router';

export default function GameScreen() {
  const { phase, target, blur, start } = useGameLogic();
  const [guess, setGuess] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>C'est quoi ?</Text>
      
      <View style={[styles.box, { backgroundColor: '#000', opacity: 1 - blur/20 }]}>
         <Text style={{ color: '#fff', fontSize: 100 }}>🍎</Text>
      </View>

      <TextInput
        value={guess}
        onChangeText={setGuess}
        placeholder="Votre réponse..."
        placeholderTextColor={CONFIG.COLORS.muted}
        style={styles.input}
      />

      <Pressable 
        style={styles.btn}
        onPress={() => {
          if (guess.toLowerCase() === target.toLowerCase()) {
            alert('Gagné !');
            router.replace('/');
          }
        }}
      >
        <Text style={styles.btnText}>Valider</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent: 'center', padding: 20 },
  title: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  box: { width: 250, height: 250, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  input: { width: '100%', backgroundColor: CONFIG.COLORS.surface, color: CONFIG.COLORS.text, padding: 15, borderRadius: 10, marginBottom: 20 },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 25 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
