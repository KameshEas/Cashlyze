import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, AppState } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useRef, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import SplashView from './src/views/SplashView';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [ready, setReady] = useState(false);
  const mounted = useRef(false);

  const onSplashDone = useCallback(() => {
    setReady(true);
  }, []);

  const onRootLayout = useCallback(() => {
    // Hide the native splash as soon as the root view has laid out
    // so our animated SplashView is visible.
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    // In a real app, preload fonts/assets here.
    mounted.current = true;
    // Show splash on resume to meet "every time" expectation in dev/Expo Go.
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        // Force showing animated splash again on app foreground.
        setReady(false);
      }
    });
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container} onLayout={onRootLayout}>
      {ready ? <AppNavigator /> : <SplashView onDone={onSplashDone} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
