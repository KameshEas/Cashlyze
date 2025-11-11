import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  onDone?: () => void;
  durationMs?: number;
};

export default function SplashView({ onDone, durationMs = 1400 }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(underlineWidth, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.delay(200),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDone?.();
    });
  }, [opacity, scale, underlineWidth, onDone]);

  const underlineStyle = {
    width: underlineWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '60%'] }),
  } as const;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity, transform: [{ scale }] }]}>
        <Text style={styles.logo}>Cashlyze</Text>
        <View style={styles.underlineTrack}>
          <Animated.View style={[styles.underline, underlineStyle]} />
        </View>
        <Text style={styles.tagline}>Know where your money flows.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  underlineTrack: {
    width: '60%',
    height: 2,
    backgroundColor: 'transparent',
    marginTop: 6,
    overflow: 'hidden',
  },
  underline: {
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  tagline: {
    marginTop: 12,
    color: colors.subtleTextLight,
    fontSize: 14,
    fontWeight: '500',
  },
});