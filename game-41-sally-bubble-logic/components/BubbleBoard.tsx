import Svg, { Circle, Line } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { View } from 'react-native';

interface Props {
  bubbles: any[]; paths: Map<string,any>; drawing: any;
  gridSize: number; cellSize: number;
  onStart:(r:number,c:number)=>void;
  onMove:(r:number,c:number)=>void;
  onEnd:(r:number,c:number)=>void;
}

export function BubbleBoard({ bubbles, paths, drawing, gridSize, cellSize, onStart, onMove, onEnd }: Props) {
  const total = gridSize * cellSize;

  const toPixel = (row:number, col:number) => ({
    x: col * cellSize + cellSize/2,
    y: row * cellSize + cellSize/2,
  });

  const toCell = (px:number, py:number) => ({
    row: Math.floor(py / cellSize),
    col: Math.floor(px / cellSize),
  });

  const pan = Gesture.Pan()
    .onBegin(e => { const c = toCell(e.x,e.y); onStart(c.row,c.col); })
    .onUpdate(e => { const c = toCell(e.x,e.y); onMove(c.row,c.col); })
    .onEnd(e => { const c = toCell(e.x,e.y); onEnd(c.row,c.col); });

  const renderPath = (cells:[number,number][], color:string, key:string) =>
    cells.slice(0,-1).map(([r,c],i) => {
      const from = toPixel(r,c), to = toPixel(cells[i+1][0],cells[i+1][1]);
      return <Line key={`${key}-${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
        stroke={color} strokeWidth={cellSize*0.4} strokeLinecap="round" opacity={0.6} />;
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={{ width: total, height: total, backgroundColor: '#111', borderRadius: 10, overflow: 'hidden' }}>
        <Svg width={total} height={total}>
          {Array.from(paths.values()).flatMap(p => renderPath(p.cells, p.color, p.color))}
          {drawing && renderPath(drawing.cells, drawing.color, 'drawing')}
          {bubbles.map(b => {
            const { x, y } = toPixel(b.row, b.col);
            return <Circle key={b.id} cx={x} cy={y} r={cellSize*0.38} fill={b.color} />;
          })}
        </Svg>
      </View>
    </GestureDetector>
  );
}
