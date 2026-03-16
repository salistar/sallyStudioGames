import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Ball, Wall, Goal } from '../components/Renderers';
import { Physics } from '../systems/Physics';
import { useState, useRef } from 'react';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const engineRef = useRef<any>(null);

  const setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0; // Pas de gravité pour le golf top-down

    let ball = Matter.Bodies.circle(width / 2, height - 100, 15, { label: 'ball', frictionAir: 0.05 });
    let goal = Matter.Bodies.circle(width / 2, 100, 25, { isSensor: true, label: 'goal' });
    
    let leftWall = Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
    let rightWall = Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
    let topWall = Matter.Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });
    let bottomWall = Matter.Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });

    Matter.World.add(world, [ball, goal, leftWall, rightWall, topWall, bottomWall]);

    Matter.Events.on(engine, 'collisionStart', (event) => {
      let pairs = event.pairs;
      pairs.forEach(pair => {
        if ((pair.bodyA.label === 'ball' && pair.bodyB.label === 'goal') ||
            (pair.bodyB.label === 'ball' && pair.bodyA.label === 'goal')) {
          setScore(s => s + 1);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          // Reset ball position
          Matter.Body.setPosition(ball, { x: width / 2, y: height - 100 });
          Matter.Body.setVelocity(ball, { x: 0, y: 0 });
        }
      });
    });

    return {
      physics: { engine, world },
      ball: { body: ball, renderer: Ball },
      goal: { body: goal, renderer: Goal },
      leftWall: { body: leftWall, renderer: Wall },
      rightWall: { body: rightWall, renderer: Wall },
      topWall: { body: topWall, renderer: Wall },
      bottomWall: { body: bottomWall, renderer: Wall },
    };
  };

  const handleShoot = (event: any) => {
    if (!running) return;
    const { locationX, locationY } = event.nativeEvent;
    const ballPos = engineRef.current.entities.ball.body.position;
    
    const dx = ballPos.x - locationX;
    const dy = ballPos.y - locationY;
    
    const force = 0.05;
    Matter.Body.applyForce(engineRef.current.entities.ball.body, ballPos, { x: dx * force, y: dy * force });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <GameEngine
        ref={engineRef}
        style={styles.gameContainer}
        systems={[Physics]}
        entities={setupWorld()}
        running={running}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleShoot} />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#228B22' },
  score: { position: 'absolute', top: 50, right: 20, color: '#fff', fontSize: 24, fontWeight: '800', zIndex: 10 },
  gameContainer: { flex: 1 },
});
