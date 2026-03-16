import { useState, useCallback } from 'react';

type Phase = 'idle' | 'playing' | 'paused' | 'gameover';
type SymmetryMode = 'axial' | 'radial' | 'kaleidoscope';

interface Point { x: number; y: number; }
interface Line { points: Point[]; color: string; thickness: number; }

export function useGameLogic() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[] | null>(null);
  const [color, setColor] = useState('#4D96FF');
  const [mode, setMode] = useState<SymmetryMode>('axial');

  const start = useCallback(() => {
    setPhase('playing');
    setLevel(1);
    setLines([]);
    setCurrentLine(null);
  }, []);

  const end = useCallback(() => setPhase('gameover'), []);

  const clear = useCallback(() => setLines([]), []);

  const addPoint = useCallback((p: Point) => {
    setCurrentLine(prev => prev ? [...prev, p] : [p]);
  }, []);

  const endLine = useCallback(() => {
    if (currentLine) {
      setLines(prev => [...prev, { points: currentLine, color, thickness: 4 }]);
      setCurrentLine(null);
    }
  }, [currentLine, color]);

  return { phase, level, lines, currentLine, color, setColor, mode, setMode, start, end, clear, addPoint, endLine };
}
