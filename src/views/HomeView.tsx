import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCounterViewModel } from '../hooks/useCounterViewModel';

export default function HomeView() {
  const { count, increment, decrement, reset } = useCounterViewModel(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cashlyze</Text>
      <Text style={styles.subtitle}>MVVM Starter (Counter)</Text>

      <Text style={styles.counter}>{count}</Text>

      <View style={styles.row}>
        <Pressable style={[styles.button, styles.primary]} onPress={increment}>
          <Text style={styles.buttonText}>Increment</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={decrement}>
          <Text style={styles.buttonText}>Decrement</Text>
        </Pressable>
      </View>

      <Pressable style={[styles.button, styles.outline]} onPress={() => reset(0)}>
        <Text style={[styles.buttonText, styles.outlineText]}>Reset</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  counter: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  secondary: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  outlineText: {
    color: '#2563eb',
  },
});