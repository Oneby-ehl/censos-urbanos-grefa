import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  Image,
} from 'react-native';

import { useRouter } from 'expo-router';

import { sincronizarPendientes } from '../services/sync';

export default function HomeScreen() {

  const router = useRouter();

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {

    const sync = async () => {

      const enviados = await sincronizarPendientes();

      if (enviados > 0) {

        Alert.alert(
          'Sincronización completada',
          `${enviados} censo(s) pendiente(s) enviado(s).`
        );
      }
    };

    sync();

  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          GREFA
        </Text>

        <Text style={styles.subtitle}>
          Censos de Biodiversidad
        </Text>
      </View>

      <Image
        source={require('../assets/logo-biodiversidad.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.buttonsContainer}>

        <Pressable
          style={[styles.button, styles.primary]}
          onPress={() => router.push('/formulario/paso1')}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            Nuevo censo
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/pendientes')}
        >
          <Text style={styles.buttonText}>
            Registros locales
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setShowPinModal(true)}
        >
          <Text style={styles.buttonText}>
            Configuración
          </Text>
        </Pressable>

      </View>

      <Modal
        visible={showPinModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Introduce PIN
            </Text>

            <TextInput
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
              style={styles.pinInput}
            />

            <View style={styles.modalButtons}>

              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={() => {
                  setShowPinModal(false);
                  setPin('');
                }}
              >
                <Text style={styles.buttonText}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={() => {

                  if (pin === '1234') {

                    setShowPinModal(false);
                    setPin('');

                    router.push('/configuracion');

                  } else {

                    Alert.alert(
                      'Error',
                      'PIN incorrecto'
                    );
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  Aceptar
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 18,
    color: '#5f5f5f',
    fontWeight: '500',
  },

  logo: {
    width: '100%',
    height: 320,
    alignSelf: 'center',
  },

  buttonsContainer: {
    gap: 14,
    marginBottom: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },

  primary: {
    backgroundColor: '#3c7a3c',
    borderColor: '#3c7a3c',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  buttonTextPrimary: {
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#222',
  },

  pinInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  modalButton: {
    flex: 1,
  },
});