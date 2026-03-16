import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useQuiz } from '../hooks/useQuiz';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

export default function GameScreen() {
  const { current, index, selected, isAnswered, isFinished, score, total, answer, next } = useQuiz();

  if (isFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.finishedLabel}>Quiz Terminé !</Text>
        <Text style={styles.finalScore}>{score} / {total}</Text>
        <Pressable style={styles.homeBtn} onPress={() => router.replace('/')}>
          <Text style={styles.homeBtnText}>Accueil</Text>
        </Pressable>
      </View>
    );
  }

  const handleChoice = (choice: string) => {
    if (isAnswered) return;
    answer(choice);
    const correct = choice === current.french;
    Haptics.notificationAsync(correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.progress}>
        <Text style={styles.progressText}>Question {index + 1} / {total}</Text>
        <View style={styles.barContainer}>
            <View style={[styles.bar, { width: ((index + 1) / total) * 100 + '%' }]} />
        </View>
      </View>

      <Animated.View key={current.id} entering={SlideInRight} style={styles.card}>
        <Text style={styles.darija}>{current.darija}</Text>
        <Text style={styles.latin}>({current.latin})</Text>
        <Text style={styles.instruction}>Que signifie cette expression ?</Text>
      </Animated.View>

      <View style={styles.choices}>
        {current.choices.map((choice: string) => {
          const isSelected = selected === choice;
          const isCorrect = choice === current.french;
          const showResult = isAnswered && (isSelected || isCorrect);
          
          return (
            <Pressable
              key={choice}
              onPress={() => handleChoice(choice)}
              style={[
                styles.choiceBtn,
                isSelected && styles.selected,
                showResult && isCorrect && styles.correct,
                showResult && isSelected && !isCorrect && styles.wrong
              ]}
            >
              <Text style={styles.choiceText}>{choice}</Text>
            </Pressable>
          );
        })}
      </View>

      {isAnswered && (
        <Animated.View entering={FadeIn} style={styles.nextContainer}>
          <Pressable style={styles.nextBtn} onPress={next}>
            <Text style={styles.nextText}>Continuer</Text>
          </Pressable>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, alignItems: 'center', justifyContent: 'center' },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 60, gap: 30 },
  progress: { gap: 10 },
  progressText: { color: CONFIG.COLORS.muted, fontWeight: '800', fontSize: 12 },
  barContainer: { height: 6, backgroundColor: CONFIG.COLORS.surface, borderRadius: 3, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: CONFIG.COLORS.primary },
  card: { backgroundColor: CONFIG.COLORS.surface, padding: 40, borderRadius: 20, alignItems: 'center', gap: 10 },
  darija: { color: '#fff', fontSize: 48, fontWeight: '900' },
  latin: { color: CONFIG.COLORS.muted, fontSize: 18, fontStyle: 'italic' },
  instruction: { color: CONFIG.COLORS.warning, fontSize: 14, fontWeight: '700', marginTop: 10 },
  choices: { gap: 12 },
  choiceBtn: { backgroundColor: CONFIG.COLORS.surface, padding: 20, borderRadius: 15, borderWidth: 2, borderColor: 'transparent' },
  choiceText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  selected: { borderColor: CONFIG.COLORS.primary },
  correct: { backgroundColor: CONFIG.COLORS.success + '33', borderColor: CONFIG.COLORS.success },
  wrong: { backgroundColor: CONFIG.COLORS.danger + '33', borderColor: CONFIG.COLORS.danger },
  nextContainer: { alignItems: 'center', marginTop: 10 },
  nextBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  nextText: { color: '#fff', fontWeight: '800' },
  finishedLabel: { color: CONFIG.COLORS.muted, fontSize: 24, fontWeight: '900' },
  finalScore: { color: '#fff', fontSize: 84, fontWeight: '900', marginVertical: 30 },
  homeBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  homeBtnText: { color: '#fff', fontWeight: '800' },
});
