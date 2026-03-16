import { useState, useCallback } from 'react';
import words from '../data/darija_words.json';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useQuiz(questionCount = 10) {
  const [questions] = useState(() => shuffle(words as any[]).slice(0, questionCount));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questionCount).fill(null));
  const [selected, setSelected] = useState<string | null>(null);

  const current = questions[index];
  const isAnswered = selected !== null;
  const isFinished = index >= Math.min(questions.length, questionCount);

  const answer = useCallback((choice: string) => {
    if (isAnswered) return;
    const correct = choice === current.french;
    setSelected(choice);
    setAnswers(prev => {
      const next = [...prev];
      next[index] = correct;
      return next;
    });
  }, [isAnswered, current, index]);

  const next = useCallback(() => {
    setSelected(null);
    setIndex(i => i + 1);
  }, []);

  const score = answers.filter(Boolean).length;
  return { current, index, selected, isAnswered, isFinished, answers, score, answer, next, total: Math.min(questions.length, questionCount) };
}
