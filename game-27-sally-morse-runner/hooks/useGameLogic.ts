import { useState, useCallback, useRef } from 'react';
import { MORSE_MAP } from '../constants/morse';

export function useGameLogic() {
  const [currentTarget, setCurrentTarget] = useState('S');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  const checkInput = useCallback((char: '.' | '-') => {
    const nextInput = input + char;
    const targetMorse = MORSE_MAP[currentTarget];

    if (targetMorse.startsWith(nextInput)) {
      if (nextInput === targetMorse) {
        setScore(s => s + 1);
        setInput('');
        const letters = Object.keys(MORSE_MAP);
        setCurrentTarget(letters[Math.floor(Math.random() * letters.length)]);
      } else {
        setInput(nextInput);
      }
    } else {
      setInput(''); // Error
    }
  }, [input, currentTarget]);

  return { currentTarget, input, score, checkInput };
}
