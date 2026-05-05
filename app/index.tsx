import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { sincronizarPendientes } from '../services/sync';

export default function HomeScreen() {
  const router = useRouter();

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
      <Text style={styles.title}>GREFA</Text>
      <Text style={styles.subtitle}>Censos urbanos</Text>

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
        <Text style={styles.buttonText}>Registros locales</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/configuracion')}
      >
        <Text style={styles.buttonText}>Configuración</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: 'gray',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f7f7f7',
  },
  primary: {
    backgroundColor: '#3c7a3c',
    borderColor: '#3c7a3c',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  buttonTextPrimary: {
    color: '#fff',
  },
});