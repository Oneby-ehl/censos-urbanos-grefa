import { useRouter } from 'expo-router';
import { ui } from '../styles/ui';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { getApiUrl, setApiUrl } from '../services/settings';
import AppButton from '../components/AppButton';

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
      Alert.alert('URL no válida', 'La URL debe ser una URL de Google Apps Script.');
      return;
    }

    await setApiUrl(url);
    Alert.alert('Configuración guardada', 'La URL de envío se ha actualizado.');
  };

  const probar = async () => {
    try {
      const response = await fetch(url);
      const text = await response.text();

      Alert.alert('Prueba de conexión', text || 'Conexión correcta');
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con la URL indicada.');
    }
  };

  return (
    <ScrollView contentContainerStyle={ui.container}>
	<View style={styles.topBar}>
  <Text style={styles.exit} onPress={() => router.replace('/')}>
    Salir
  </Text>
</View>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.label}>URL de envío a Google Sheets</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
        multiline
      />

      <View style={styles.buttons}>
        <AppButton title="Guardar URL" onPress={guardar} primary />
        <AppButton title="Probar conexión" onPress={probar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  topBar: {
  marginBottom: 10,
},

exit: {
  color: '#3c7a3c',
  fontSize: 16,
  fontWeight: '600',
},
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttons: {
    marginTop: 10,
  },
});