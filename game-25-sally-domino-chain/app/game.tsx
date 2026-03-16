import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Domino, Floor } from '../components/Renderers';
import { Physics } from '../systems/Physics';
import { useState, useRef } from 'react';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [dominoes, setDominoes] = useState<any[]>([]);
  const engineRef = useRef<any>(null);
  const worldRef = useRef<any>(null);

  const initWorld = () => {
    let engine = Matter.Engine.create();
    let world = engine.world;
    worldRef.current = world;

    let floor = Matter.Bodies.rectangle(width / 2, height - 50, width, 100, { isStatic: true });
    Matter.World.add(world, [floor]);

    return {
      physics: { engine, world },
      floor: { body: floor, renderer: Floor },
    };
  };

  const [entities, setEntities] = useState(initWorld());

  const addDomino = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    
    const domino = Matter.Bodies.rectangle(locationX, locationY, 15, 60, { friction: 0.5 });
    Matter.World.add(worldRef.current, domino);

    setEntities((prev: any) => ({
      ...prev,
      [`domino_${Date.now()}`]: { body: domino, renderer: Domino, color: '#FFD700' }
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const startChain = () => {
    const firstKey = Object.keys(entities).find(k => k.startsWith('domino_'));
    if (firstKey) {
      const firstDomino = entities[firstKey].body;
      Matter.Body.applyForce(firstDomino, firstDomino.position, { x: 0.02, y: 0 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Domino Chain</Text>
        <Pressable style={styles.startBtn} onPress={startChain}>
          <Text style={styles.startBtnText}>GO!</Text>
        </Pressable>
      </View>

      <GameEngine
        ref={engineRef}
        style={styles.gameContainer}
        systems={[Physics]}
        entities={entities}
        running={running}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={addDomino} />
      </GameEngine>
      
      <Text style={styles.hint}>Tape pour poser des dominos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  startBtn: { backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  startBtnText: { color: '#000', fontWeight: '900' },
  gameContainer: { flex: 1 },
  hint: { position: 'absolute', bottom: 50, color: '#444', alignSelf: 'center' },
});
