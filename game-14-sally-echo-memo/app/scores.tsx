import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useHighScore } from '../hooks/useHighScore';
import { router } from 'expo-router';

export default function ScoresScreen() {
  const { scores } = useHighScore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meilleurs scores</Text>
      <FlatList
        data={scores}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.val}>Round {item.round}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun score encore</Text>}
      />
      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Retour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#222' },
  rank: { color: '#FFA502', width: 40, fontWeight: '700' },
  val: { color: '#fff', flex: 1 },
  date: { color: '#666', fontSize: 12 },
  empty: { color: '#555', textAlign: 'center', marginTop: 40 },
  btn: { marginTop: 30, backgroundColor: '#222', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16 },
});
