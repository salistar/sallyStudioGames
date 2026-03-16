import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import { useEffect } from 'react';

export default function GameScreen() {
  const { target, guesses, currentGuess, setCurrentGuess, gameOver, submit, start } = useGameLogic();

  useEffect(() => { start(); }, []);

  const getLetterStyle = (guess: string, index: number) => {
    const char = guess[index];
    if (char === target[index]) return { backgroundColor: CONFIG.COLORS.correct };
    if (target.includes(char)) return { backgroundColor: CONFIG.COLORS.present };
    return { backgroundColor: CONFIG.COLORS.absent };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lingo Duel</Text>
      
      <View style={styles.board}>
        {Array.from({ length: 6 }).map((_, i) => {
          const guess = guesses[i] || (i === guesses.length ? currentGuess : '');
          return (
            <View key={i} style={styles.row}>
              {Array.from({ length: 5 }).map((_, j) => (
                <View key={j} style={[styles.cell, guesses[i] && getLetterStyle(guesses[i], j)]}>
                  <Text style={styles.cellText}>{guess[j] || ''}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>

      {!gameOver && (
        <View style={styles.inputArea}>
          <TextInput
            maxLength={5}
            value={currentGuess}
            onChangeText={setCurrentGuess}
            style={styles.input}
            autoFocus
          />
          <Pressable onPress={submit} style={styles.btn}>
            <Text style={styles.btnText}>Valider</Text>
          </Pressable>
        </View>
      )}

      {gameOver && (
        <View style={styles.res}>
          <Text style={styles.resText}>{guesses[guesses.length-1] === target ? 'BRAVO !' : `PERDU... (${target})`}</Text>
          <Pressable onPress={start} style={styles.btn}>
            <Text style={styles.btnText}>Rejouer</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', justifyContent: 'center', padding: 20 },
  title: { color: CONFIG.COLORS.text, fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  board: { gap: 5 },
  row: { flexDirection: 'row', gap: 5 },
  cell: { width: 50, height: 50, borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
  cellText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  inputArea: { marginTop: 30, flexDirection: 'row', gap: 10 },
  input: { width: 150, backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 10, textAlign: 'center', fontSize: 20 },
  btn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 20, justifyContent: 'center', borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  res: { marginTop: 30, alignItems: 'center' },
  resText: { color: CONFIG.COLORS.text, fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
