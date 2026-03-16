import { useState, useCallback, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const PADDLE_W = 80;
const BALL_SIZE = 15;

export function useGameLogic() {
  const [ball, setBall] = useState({ x: width / 2, y: height / 2, dx: 4, dy: 4 });
  const [p1, setP1] = useState(width / 2 - PADDLE_W / 2);
  const [p2, setP2] = useState(width / 2 - PADDLE_W / 2);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const frameRef = useRef<number>(0);

  const update = useCallback(() => {
    setBall(prev => {
      let nx = prev.x + prev.dx;
      let ny = prev.y + prev.dy;
      let ndx = prev.dx;
      let ndy = prev.dy;

      // Walls
      if (nx <= 0 || nx >= width - BALL_SIZE) ndx *= -1;

      // Paddles
      if (ny <= 60 && nx >= p1 && nx <= p1 + PADDLE_W) {
        ndy = Math.abs(ndy);
      }
      if (ny >= height - 80 && nx >= p2 && nx <= p2 + PADDLE_W) {
        ndy = -Math.abs(ndy);
      }

      // Goals
      if (ny <= 0) {
        setScore(s => ({ ...s, p2: s.p2 + 1 }));
        return { x: width / 2, y: height / 2, dx: 4, dy: 4 };
      }
      if (ny >= height) {
        setScore(s => ({ ...s, p1: s.p1 + 1 }));
        return { x: width / 2, y: height / 2, dx: 4, dy: -4 };
      }

      return { x: nx, y: ny, dx: ndx, dy: ndy };
    });
    frameRef.current = requestAnimationFrame(update);
  }, [p1, p2]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [update]);

  return { ball, p1, setP1, p2, setP2, score };
}
