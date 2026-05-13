import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getApiUrl, setApiUrl } from '../services/settings';
import AppButton from '../components/AppButton';
import { ui } from '../styles/ui';

export default function ConfiguracionScreen() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const actual = await getApiUrl();
      setUrl(actual);
    };

    cargar();
  }, []);

  const guardar = async () => {
    if (!url.startsWith('https://script.google.com/macros/s/')) {
      Alert.alert(
        'URL no válida',
        'La URL debe ser una URL de Google Apps Script.'
      );
      return;
    }

    await setApiUrl(url);

    Alert.alert(
      'Configuración guardada',
      'La URL de envío se ha actualizado.'
    );
  };

  const probar = async () => {
    try {
      const response = await fetch(url);
      const text = await response.text();

      Alert.alert(
        'Prueba de conexión',
        text || 'Conexión correcta'
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo conectar con la URL indicada.'
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.replace('/')}
          style={styles.topButton}
        >
          <Text style={styles.topButtonText}>
            Salir
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          ui.container,
          { paddingTop: 16, paddingBottom: 40 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={ui.stepHeader}>
          <Text style={ui.stepTitle}>
            Configuración
          </Text>
        </View>

        <View style={ui.formCard}>
          <Text style={styles.label}>
            URL de envío a Google Sheets
          </Text>

          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
          />

          <View style={styles.buttons}>
            <AppButton
              title="Guardar URL"
              onPress={guardar}
              primary
            />

            <AppButton
              title="Probar conexión"
              onPress={probar}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#f2f6f2',
    borderWidth: 1,
    borderColor: '#d4e5d2',
  },

  topButtonText: {
    color: '#3c7a3c',
    fontSize: 13,
    fontWeight: '700',
  },

  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },

  buttons: {
    gap: 10,
  },
});