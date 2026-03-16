import { useState, useCallback, useEffect } from 'react';

interface Point { id: number; x: number; y: number; }
interface Edge { id: string; p1: number; p2: number; }

export function useGameLogic() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState<Point[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());

  const generateLevel = useCallback((l: number) => {
    // Basic level generation for demonstration
    // Level 1: A square
    const newPoints = [
      { id: 0, x: 100, y: 100 },
      { id: 1, x: 300, y: 100 },
      { id: 2, x: 300, y: 300 },
      { id: 3, x: 100, y: 300 },
    ];
    const newEdges = [
      { id: '0-1', p1: 0, p2: 1 },
      { id: '1-2', p1: 1, p2: 2 },
      { id: '2-3', p1: 2, p2: 3 },
      { id: '3-0', p1: 3, p2: 0 },
    ];
    setPoints(newPoints);
    setEdges(newEdges);
    setPath([]);
    setVisitedEdges(new Set());
    setPhase('playing');
  }, []);

  const start = useCallback(() => {
    generateLevel(1);
  }, [generateLevel]);

  const selectPoint = useCallback((pid: number) => {
    if (phase !== 'playing') return;

    setPath(prev => {
      if (prev.length === 0) return [pid];
      
      const lastPid = prev[prev.length - 1];
      if (lastPid === pid) return prev;

      // Check if edge exists
      const edge = edges.find(e => 
        (e.p1 === lastPid && e.p2 === pid) || (e.p1 === pid && e.p2 === lastPid)
      );

      if (!edge) return prev;

      // Check if already visited in this stroke
      const edgeKey = [lastPid, pid].sort().join('-');
      if (visitedEdges.has(edgeKey)) return prev;

      setVisitedEdges(v => new Set(v).add(edgeKey));
      return [...prev, pid];
    });
  }, [edges, visitedEdges, phase]);

  useEffect(() => {
    if (phase === 'playing' && visitedEdges.size === edges.length && edges.length > 0) {
      setPhase('won');
    }
  }, [visitedEdges, edges, phase]);

  return { phase, level, points, edges, path, visitedEdges, start, selectPoint };
}
