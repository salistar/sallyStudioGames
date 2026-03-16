import { useState, useCallback, useRef } from 'react';

export function useGameLogic() {
  const [targetTime, setTargetTime] = useState(2.0); // secondes
  const [holdingTime, setHoldingTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const startTimeRef = useRef<number>(0);

  const startHolding = useCallback(() => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    setFeedback('');
  }, []);

  const stopHolding = useCallback(() => {
    setIsHolding(false);
    const duration = (Date.now() - startTimeRef.current) / 1000;
    setHoldingTime(duration);
    
    const diff = Math.abs(targetTime - duration);
    if (diff < 0.1) {
      setScore(s => s + 1000);
      setFeedback('PERFAIT !');
    } else if (diff < 0.3) {
      setScore(s => s + 500);
      setFeedback('Excellent !');
    } else if (diff < 0.5) {
      setScore(s => s + 100);
      setFeedback('Pas mal');
    } else {
      setFeedback('Trop tôt ou trop tard');
    }

    // New target
    setTargetTime(Number((1.0 + Math.random() * 3.0).toFixed(1)));
  }, [targetTime]);

  return { targetTime, holdingTime, isHolding, feedback, score, startHolding, stopHolding };
}
