export interface Segment {
  id: number;
  points: string; // SVG path d
  connectedTo: number[];
}

export const KNOT_SEGMENTS: Segment[] = [
  { id: 1, points: "M 100 100 Q 150 50 200 100", connectedTo: [2, 4] },
  { id: 2, points: "M 200 100 Q 250 150 200 200", connectedTo: [1, 3] },
  { id: 3, points: "M 200 200 Q 150 250 100 200", connectedTo: [2, 4] },
  { id: 4, points: "M 100 200 Q 50 150 100 100", connectedTo: [3, 1] },
];
