import { ReactNode, useMemo } from 'react';
import { View, Text, StyleSheet, PanResponder, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  previousRoute?: string;
  nextRoute?: string;
};

export default function SwipeStep({
  children,
  currentStep,
  totalSteps,
  previousRoute,
  nextRoute,
}: Props) {
  const router = useRouter();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 35 && Math.abs(gestureState.dy) < 25;
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -70 && nextRoute) {
            router.push(nextRoute);
          }

          if (gestureState.dx > 70 && previousRoute) {
            router.push(previousRoute);
          }
        },
      }),
    [nextRoute, previousRoute]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.wrapper} {...panResponder.panHandlers}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.replace('/')} style={styles.exitButton}>
            <Text style={styles.exitText}>Salir</Text>
          </Pressable>

          <Text style={styles.stepText}>
            {currentStep}/{totalSteps}
          </Text>
        </View>

        <View style={styles.content}>{children}</View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {Array.from({ length: totalSteps }).map((_, index) => {
              const active = index + 1 === currentStep;

              return (
                <Text key={index} style={[styles.dot, active && styles.dotActive]}>
                  ●
                </Text>
              );
            })}
          </View>

          <Text style={styles.hint}>Desliza para avanzar o retroceder</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  exitText: {
    color: '#3c7a3c',
    fontSize: 16,
    fontWeight: '600',
  },
  stepText: {
    color: 'gray',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingBottom: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  dot: {
    fontSize: 18,
    color: '#d0d0d0',
    marginHorizontal: 3,
  },
  dotActive: {
    color: '#3c7a3c',
  },
  hint: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
});