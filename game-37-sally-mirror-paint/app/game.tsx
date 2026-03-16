import { View, StyleSheet, Alert } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useScore } from '../hooks/useScore';
import { GameUI } from '../components/GameUI';
import { HUD } from '../components/HUD';
import { CONFIG } from '../constants/config';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function GameScreen() {
  const { lines, currentLine, color, mode, setMode, start, clear, addPoint, endLine } = useGameLogic();
  const { score, add, save } = useScore();

  useEffect(() => {
    start();
  }, [start]);

  const handleSave = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      // In a real implementation with ref + capture, we'd save the canvas image
      Alert.alert('Sauvegardé', 'Ton dessin a été enregistré dans ta galerie !');
      add(500); // Points for creating
    }
  };

  return (
    <View style={styles.container}>
      <GameUI 
        lines={lines} 
        currentLine={currentLine} 
        color={color} 
        mode={mode} 
        onAddPoint={addPoint} 
        onEndLine={endLine} 
      />
      <HUD 
        mode={mode} 
        setMode={setMode} 
        onClear={clear} 
        onSave={handleSave} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, justifyContent: 'center' },
});
