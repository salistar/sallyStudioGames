import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../constants/config';

export function useWordLogic() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentStroke, setCurrentStroke] = useState<[number, number][]>([]);

  const generateGrid = useCallback(() => {
    const size = CONFIG.GRID_SIZE;
    const newGrid = Array.from({ length: size }, () => 
      Array.from({ length: size }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );

    // Place target words randomly (simplified)
    CONFIG.TARGET_WORDS.forEach(word => {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * (size - word.length));
        for (let i = 0; i < word.length; i++) {
            newGrid[row][col + i] = word[i];
        }
    });

    setGrid(newGrid);
  }, []);

  const addPoint = useCallback((r: number, c: number) => {
    setCurrentStroke(prev => {
        if (prev.some(([pr, pc]) => pr === r && pc === c)) return prev;
        return [...prev, [r, c]];
    });
  }, []);

  const validate = useCallback(() => {
    const word = currentStroke.map(([r, c]) => grid[r][c]).join('');
    if (CONFIG.TARGET_WORDS.includes(word) && !foundWords.includes(word)) {
        setFoundWords(prev => [...prev, word]);
        setCurrentStroke([]);
        return true;
    }
    setCurrentStroke([]);
    return false;
  }, [currentStroke, grid, foundWords]);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  const isFinished = foundWords.length === CONFIG.TARGET_WORDS.length;

  return { grid, foundWords, currentStroke, addPoint, validate, isFinished };
}
