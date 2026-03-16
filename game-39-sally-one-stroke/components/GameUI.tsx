import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import Svg, { Line, Circle, G } from 'react-native-svg';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 40;

export const GameUI = ({ points, edges, path, visitedEdges, onSelectPoint }: any) => {
  return (
    <View style={styles.container}>
      <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
        {/* Render edges */}
        {edges.map((edge: any) => {
          const p1 = points[edge.p1];
          const p2 = points[edge.p2];
          const isVisited = visitedEdges.has([edge.p1, edge.p2].sort().join('-'));
          
          return (
            <Line
              key={edge.id}
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
              stroke={isVisited ? CONFIG.COLORS.success : '#333'}
              strokeWidth={isVisited ? 8 : 4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Render current path segment */}
        {path.length > 1 && (
            <Line 
                x1={points[path[path.length-2]].x}
                y1={points[path[path.length-2]].y}
                x2={points[path[path.length-1]].x}
                y2={points[path[path.length-1]].y}
                stroke={CONFIG.COLORS.primary}
                strokeWidth={10}
                strokeLinecap="round"
                opacity={0.5}
            />
        )}

        {/* Render points */}
        {points.map((p: any) => {
          const isSelected = path[path.length - 1] === p.id;
          return (
            <G key={p.id}>
              <Circle
                cx={p.x} cy={p.y}
                r={isSelected ? 15 : 10}
                fill={isSelected ? CONFIG.COLORS.primary : CONFIG.COLORS.text}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onSelectPoint(p.id);
                }}
              />
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: CANVAS_SIZE, height: CANVAS_SIZE, backgroundColor: CONFIG.COLORS.surface, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});
