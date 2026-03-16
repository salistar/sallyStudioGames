import { useState, useCallback } from 'react';

interface Bubble { id:string; color:string; row:number; col:number; }
interface Path { color:string; cells:[number,number][]; }

export function usePuzzleLogic(bubbles: Bubble[], gridSize: number) {
  const [paths, setPaths] = useState<Map<string, Path>>(new Map());
  const [drawing, setDrawing] = useState<{ color:string; cells:[number,number][] } | null>(null);

  const getBubbleAt = (row:number, col:number) => bubbles.find(b => b.row===row && b.col===col);

  const startDraw = useCallback((row:number, col:number) => {
    const bubble = getBubbleAt(row, col);
    if (!bubble) return;
    setDrawing({ color: bubble.color, cells: [[row, col]] });
  }, [bubbles]);

  const extendDraw = useCallback((row:number, col:number) => {
    if (!drawing) return;
    const last = drawing.cells[drawing.cells.length - 1];
    if (last[0]===row && last[1]===col) return;

    // Vérifie adjacence
    const dr = Math.abs(row-last[0]), dc = Math.abs(col-last[1]);
    if (dr+dc !== 1) return;

    // Vérifie pas de croisement avec autre chemin
    for (const [color, path] of Array.from(paths.entries())) {
      if (color === drawing.color) continue;
      if (path.cells.some(([r,c]) => r===row && c===col)) return;
    }

    setDrawing(d => d ? { ...d, cells: [...d.cells, [row, col]] } : null);
  }, [drawing, paths]);

  const endDraw = useCallback((row:number, col:number) => {
    if (!drawing) return;
    const endBubble = getBubbleAt(row, col);
    if (endBubble && endBubble.color === drawing.color && (endBubble.row !== drawing.cells[0][0] || endBubble.col !== drawing.cells[0][1])) {
      setPaths(prev => {
          const next = new Map(prev);
          next.set(drawing.color, drawing);
          return next;
      });
    }
    setDrawing(null);
  }, [drawing, bubbles]);

  const isSolved = bubbles
    .map(b => b.color)
    .filter((c, i, arr) => arr.indexOf(c) === i)
    .every(color => paths.has(color));

  const reset = useCallback(() => setPaths(new Map()), []);

  return { paths, drawing, startDraw, extendDraw, endDraw, isSolved, reset };
}
