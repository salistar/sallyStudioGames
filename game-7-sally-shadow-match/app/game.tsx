import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Rect, Polygon } from 'react-native-svg';
import { usePuzzle } from '../hooks/usePuzzle';
import { DraggablePiece } from '../components/DraggablePiece';
import { CONFIG } from '../constants/config';

export default function GameScreen() {
  const { puzzle, pieces, updatePiece, nextPuzzle } = usePuzzle();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{puzzle.name}</Text>

      {/* Zone cible - silhouette */}
      <View style={styles.shadowZone}>
        <Svg width={200} height={200}>
          {puzzle.shadow.shapes.map((s: any, i: number) => (
            s.type === 'rect'
              ? <Rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} fill="#000" opacity={0.4} />
              : <Polygon key={i} points={s.points} fill="#000" opacity={0.4} />
          ))}
        </Svg>
      </View>

      {/* Pièces manipulables */}
      <View style={styles.playArea}>
        {pieces.map(state => {
          const piece = puzzle.pieces.find((p: any) => p.id === state.id);
          return <DraggablePiece key={state.id} piece={piece} state={state} onUpdate={updatePiece} />;
        })}
      </View>

      <Pressable style={styles.btn} onPress={nextPuzzle}>
        <Text style={styles.btnText}>Niveau suivant</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: CONFIG.COLORS.background, alignItems:'center', paddingTop:60 },
  title: { fontSize:24, fontWeight:'700', marginBottom:16, color: CONFIG.COLORS.text },
  shadowZone: { width:200, height:200, backgroundColor: CONFIG.COLORS.surface, borderRadius:12 },
  playArea: { flex:1, width:'100%' },
  btn: { margin:20, backgroundColor: CONFIG.COLORS.primary, paddingHorizontal:32, paddingVertical:14, borderRadius:24 },
  btnText: { color:'#fff', fontSize:16, fontWeight:'600' },
});
