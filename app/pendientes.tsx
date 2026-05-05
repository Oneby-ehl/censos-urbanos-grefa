import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  obtenerPendientes,
  limpiarEnviadosAntiguos,
  CensoPendiente,
} from '../services/storage';
import { sincronizarPendientes } from '../services/sync';
import AppButton from '../components/AppButton';
import { ui } from '../styles/ui';

const DIAS_VISIBLES = 2;

function getEstadoStyle(estado: string) {
  if (estado === 'enviado') return styles.enviado;
  if (estado === 'error') return styles.error;
  return styles.pendiente;
}

function esRegistroReciente(item: CensoPendiente) {
  const creado = new Date(item.creado_en).getTime();
  const limite = Date.now() - DIAS_VISIBLES * 24 * 60 * 60 * 1000;

  return creado >= limite;
}

export default function PendientesScreen() {
  const router = useRouter();
  const [items, setItems] = useState<CensoPendiente[]>([]);

  const cargar = async () => {
    await limpiarEnviadosAntiguos();
	const data = await obtenerPendientes();

    const recientes = data
      .filter(esRegistroReciente)
      .reverse();

    setItems(recientes);
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  const reintentar = async () => {
    const enviados = await sincronizarPendientes();
    await cargar();

    Alert.alert(
      'Sincronización',
      enviados > 0
        ? `${enviados} censo(s) enviado(s).`
        : 'No había censos pendientes que enviar o no hay conexión.'
    );
  };

  return (
    <ScrollView contentContainerStyle={ui.container}>
      <View style={styles.topBar}>
        <Text style={styles.exit} onPress={() => router.replace('/')}>
          Salir
        </Text>
      </View>

      <Text style={ui.title}>Registros locales</Text>
      <Text style={ui.subtitle}>
        Se muestran solo los registros locales de los últimos {DIAS_VISIBLES} días.
      </Text>

      <AppButton
        title="Reintentar envío"
        onPress={reintentar}
        primary
      />

      {items.length === 0 && (
        <Text style={styles.empty}>No hay registros recientes guardados en el móvil.</Text>
      )}

      {items.map((item) => (
        <View key={item.id_local_app} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[styles.badge, getEstadoStyle(item.estado)]}>
              {item.estado.toUpperCase()}
            </Text>
            <Text style={styles.date}>{item.datos.fecha || '-'}</Text>
          </View>

          <Text style={styles.main}>
            {item.datos.especie || 'Especie sin indicar'}
          </Text>

          <Text>Identificador: {item.datos.identificador || '-'}</Text>
          <Text>Municipio: {item.datos.municipio || '-'}</Text>
          <Text>Ejemplares: {item.datos.numero_ejemplares || '-'}</Text>

          <Text style={styles.id}>ID: {item.id_local_app}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginBottom: 10,
  },
  exit: {
    color: '#3c7a3c',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 6,
  },
  empty: {
    marginTop: 20,
    color: 'gray',
  },
  card: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    backgroundColor: '#f8fbf7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  enviado: {
    backgroundColor: '#d8ead7',
    color: '#245c24',
  },
  error: {
    backgroundColor: '#f3d1d1',
    color: '#8a1f1f',
  },
  pendiente: {
    backgroundColor: '#eee5c7',
    color: '#6b5600',
  },
  date: {
    color: 'gray',
    fontSize: 13,
  },
  main: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  id: {
    marginTop: 8,
    color: 'gray',
    fontSize: 11,
  },
});