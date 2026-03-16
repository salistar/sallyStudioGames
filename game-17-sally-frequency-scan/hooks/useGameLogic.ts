import { useState, useCallback } from 'react';

export function useGameLogic() {
  const [targetFreq, setTargetFreq] = useState(0);
  const [userGuess, setUserGuess] = useState(440);
  const [isShowing, setIsShowing] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateNewChallenge = useCallback(() => {
    const newFreq = 200 + Math.floor(Math.random() * 800); // 200Hz - 1000Hz
    setTargetFreq(newFreq);
    setIsShowing(true);
    setFeedback('');
  }, []);

  const checkGuess = useCallback(() => {
    const diff = Math.abs(targetFreq - userGuess);
    setAttempts(prev => prev + 1);
    
    if (diff < 10) {
      setScore(prev => prev + 100);
      setFeedback('Parfait !');
    } else if (diff < 50) {
      setScore(prev => prev + 50);
      setFeedback('Très proche !');
    } else {
      setFeedback(userGuess < targetFreq ? 'Plus haut...' : 'Plus bas...');
    }
  }, [targetFreq, userGuess]);

  return {
    targetFreq,
    userGuess,
    setUserGuess,
    score,
    attempts,
    feedback,
    generateNewChallenge,
    checkGuess,
  };
}
