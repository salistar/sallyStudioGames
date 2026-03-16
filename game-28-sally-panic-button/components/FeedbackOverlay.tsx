import { View, StyleSheet } from 'react-native';

export const FeedbackOverlay = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Visual feedback animations could go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
});
