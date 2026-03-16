import { useState, useCallback, useEffect, useRef } from 'react';

const WORDS = ['sally', 'rapide', 'clavier', 'vitesse', 'darija', 'maroc', 'techno', 'mobile', 'react', 'native', 'expo', 'logiciel', 'code', 'vibration', 'reflexe', 'patience'];

export function useGameLogic() {
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [phase, setPhase] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [wpm, setWpm] = useState(0);
  const startTime = useRef<number>(0);

  const nextWord = useCallback(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setInput('');
  }, []);

  const start = useCallback(() => {
    setPhase('playing');
    setScore(0);
    setTimer(60);
    setWpm(0);
    startTime.current = Date.now();
    nextWord();
  }, [nextWord]);

  const end = useCallback(() => setPhase('gameover'), []);

  const onInputChange = useCallback((text: string) => {
    if (text === currentWord) {
      setScore(s => s + 1);
      nextWord();
      // Update WPM
      const mins = (Date.now() - startTime.current) / 60000;
      setWpm(Math.round((score + 1) / mins));
    } else {
      setInput(text);
    }
  }, [currentWord, score, nextWord]);

  useEffect(() => {
    if (phase === 'playing' && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && phase === 'playing') {
      end();
    }
  }, [phase, timer, end]);

  return { currentWord, input, score, timer, phase, wpm, start, onInputChange };
}
