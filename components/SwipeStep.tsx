import { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCenso } from '../context/CensoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  previousRoute?: string;
  nextRoute?: string;
};

const STEP_ROUTES = [
  '/formulario/paso1',
  '/formulario/paso3',
  '/formulario/paso5',
];

export default function SwipeStep({
  children,
  currentStep,
  totalSteps,
  previousRoute,
  nextRoute,
}: Props) {
  const router = useRouter();
  const { resetCenso } = useCenso();

  const confirmarFinalizarCenso = () => {
    Alert.alert(
      'Finalizar censo',
      '¿Seguro que quieres finalizar este censo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: () => {
            resetCenso();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.replace('/')} style={styles.topButton}>
            <Text style={styles.topButtonText}>Salir</Text>
          </Pressable>

          <Pressable
			onPress={async () => {
			await AsyncStorage.setItem(
			'ultimoPasoCenso',
			String(currentStep)
			);

			router.push('/pendientes');
			}}
			style={styles.topButton}
		   >
			<Text style={styles.topButtonText}>Registros locales</Text>
		 </Pressable>

          <Pressable onPress={confirmarFinalizarCenso} style={styles.topButton}>
            <Text style={styles.finishText}>Finalizar censo</Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          {previousRoute && (
            <Pressable
              style={[styles.sideButton, styles.leftButton]}
              onPress={() => router.push(previousRoute)}
            >
              <Text style={styles.sideButtonText}>‹</Text>
            </Pressable>
          )}

          <View style={styles.content}>{children}</View>

          {nextRoute && (
            <Pressable
              style={[styles.sideButton, styles.rightButton]}
              onPress={() => router.push(nextRoute)}
            >
              <Text style={styles.sideButtonText}>›</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.bottomBar}>
          {STEP_ROUTES.map((route, index) => {
            const step = index + 1;
            const active = step === currentStep;

            return (
              <Pressable
                key={route}
                style={[styles.stepButton, active && styles.stepButtonActive]}
                onPress={() => router.push(route)}
              >
                <Text style={[styles.stepText, active && styles.stepTextActive]}>
                  {step}
                </Text>
              </Pressable>
            );
          })}
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
  paddingHorizontal: 10,
  paddingTop: 4,
  paddingBottom: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 6,
  },
  topButton: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#f2f6f2',
    alignItems: 'center',
  },
  topButtonText: {
    color: '#3c7a3c',
    fontSize: 13,
    fontWeight: '600',
  },
  finishText: {
    color: '#9a3a3a',
    fontSize: 13,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  content: {
  flex: 1,
  paddingHorizontal: 26,
  },
  sideButton: {
  position: 'absolute',
  top: '36%',
  zIndex: 10,
  width: 18,
  height: 170,
  borderRadius: 6,
  backgroundColor: '#3c7a3c',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 1,
},
  leftButton: {
    left: 0,
  },
  rightButton: {
    right: 0,
  },
  sideButtonText: {
  color: '#fff',
  fontSize: 24,
  lineHeight: 28,
  fontWeight: '400',
  },
  bottomBar: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  stepButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c8d8c8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  stepButtonActive: {
    backgroundColor: '#3c7a3c',
    borderColor: '#3c7a3c',
  },
  stepText: {
    color: '#3c7a3c',
    fontWeight: '700',
  },
  stepTextActive: {
    color: '#fff',
  },
});