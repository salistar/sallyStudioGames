import { useState, useCallback } from 'react';
import puzzles from '../data/puzzles.json';

export interface PieceState {
  id: string;
  x: number;
  y: number;
  rotation: number;
}

export function usePuzzle() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [pieces, setPieces] = useState<PieceState[]>(() =>
    puzzles[0].pieces.map((p, i) => ({
      id: p.id, x: 20 + i * 130, y: 320, rotation: 0,
    }))
  );

  const puzzle = puzzles[puzzleIndex];

  const updatePiece = useCallback((id: string, x: number, y: number, rotation: number) => {
    setPieces(prev => prev.map(p => p.id === id ? { ...p, x, y, rotation } : p));
  }, []);

  const nextPuzzle = useCallback(() => {
    const next = (puzzleIndex + 1) % puzzles.length;
    setPuzzleIndex(next);
    setPieces(puzzles[next].pieces.map((p, i) => ({
      id: p.id, x: 20 + i * 130, y: 320, rotation: 0,
    })));
  }, [puzzleIndex]);

  return { puzzle, pieces, updatePiece, nextPuzzle };
}
