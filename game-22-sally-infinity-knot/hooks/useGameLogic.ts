import { useState, useCallback } from 'react';
import { KNOT_SEGMENTS } from '../constants/knot';

export function useGameLogic() {
  const [rotations, setRotations] = useState<Record<number, number>>(
    Object.fromEntries(KNOT_SEGMENTS.map(s => [s.id, Math.floor(Math.random() * 4) * 90]))
  );
  const [isSolved, setIsSolved] = useState(false);

  const rotateSegment = useCallback((id: number) => {
    setRotations(prev => {
      const next = { ...prev, [id]: (prev[id] + 90) % 360 };
      const allDone = Object.values(next).every(r => r === 0);
      if (allDone) setIsSolved(true);
      return next;
    });
  }, []);

  return { rotations, isSolved, rotateSegment };
}
