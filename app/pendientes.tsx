import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  obtenerPendientes,
  limpiarEnviadosAntiguos,
  CensoPendiente,
} from '../services/storage';

import { sincronizarPendientes } from '../services/sync';

import { ui } from '../styles/ui';

const DIAS_VISIBLES = 2;

function getEstadoStyle(estado: string) {

  if (estado === 'enviado') return styles.enviado;

  if (estado === 'error') return styles.error;

  return styles.pendiente;
}

function esRegistroReciente(item: CensoPendiente) {

  const creado = new Date(item.creado_en).getTime();

  const limite =
    Date.now() -
    DIAS_VISIBLES * 24 * 60 * 60 * 1000;

  return creado >= limite;
}

export default function PendientesScreen() {

  const router = useRouter();

  const [items, setItems] =
    useState<CensoPendiente[]>([]);
  const [sincronizando, setSincronizando] =
	useState(false);
  const volverAlCenso = async () => {
  router.push('/formulario/paso5');
  };

  const cargar = async () => {

    await limpiarEnviadosAntiguos();

    const data = await obtenerPendientes();

    const recientes =
      data
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

  setSincronizando(true);

  const enviados =
    await sincronizarPendientes();

  await cargar();

  setSincronizando(false);

  Alert.alert(
    'Sincronización',
    enviados > 0
      ? `${enviados} registro(s) enviado(s).`
      : 'No había registros pendientes o no hay conexión.'
    );
  };												

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
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

        <Pressable
          onPress={volverAlCenso}
          style={styles.topButton}
        >
          <Text style={styles.topButtonText}>
            Volver al censo
          </Text>
        </Pressable>

        <Pressable
          onPress={reintentar}
          style={styles.topButton}
        >
          {sincronizando ? (
           <ActivityIndicator color="#3c7a3c" />
         ) : (
           <Text style={styles.topButtonText}>
             Reintentar envío
           </Text>
         )}
        </Pressable>

      </View>

      <ScrollView
        contentContainerStyle={[
          ui.container,
          {
            paddingTop: 16,
            paddingBottom: 40,
          },
        ]}
      >

        <View
          style={[
            ui.stepHeader,
            {
              backgroundColor: '#fff4e8',
              borderColor: '#ffd3a3',
              marginTop: 6,
              marginBottom: 14,
            },
          ]}
        >
          <Text
            style={[
              ui.stepTitle,
              {
                color: '#d56b00',
              },
            ]}
          >
            Registros locales
          </Text>
        </View>

        <View style={ui.formCard}>

          <Text style={ui.subtitle}>
            Se muestran solo los registros locales
            de los últimos {DIAS_VISIBLES} días.
          </Text>

          {items.length === 0 && (
            <Text style={styles.empty}>
              No hay registros recientes guardados en el móvil.
            </Text>
          )}

          {items.map((item) => (

            <View
              key={item.id_local_app}
              style={styles.card}
            >

              <View style={styles.cardHeader}>

                <Text
                  style={[
                    styles.badge,
                    getEstadoStyle(item.estado),
                  ]}
                >
                  {item.estado.toUpperCase()}
                </Text>

                <Text style={styles.date}>
                  {item.datos.fecha || '-'}
                </Text>

              </View>

              <Text style={styles.main}>
                {item.datos.especie ||
                  'Especie sin indicar'}
              </Text>

              <Text>
                Municipio:{' '}
                {item.datos.municipio || '-'}
              </Text>

              <Text>
                Ejemplares:{' '}
                {item.datos.numero_ejemplares || '-'}
              </Text>

              <Text style={styles.id}>
                ID: {item.id_local_app}
              </Text>

            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  topBar: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    backgroundColor: '#fff',
  },

  topButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f2f6f2',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4e5d2',
  },

  topButtonText: {
    color: '#3c7a3c',
    fontSize: 13,
    fontWeight: '700',
  },

  empty: {
    marginTop: 10,
    color: '#6f6f6f',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
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
    fontSize: 11,
    fontWeight: '700',
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
    backgroundColor: '#fff1cf',
    color: '#7a5a00',
  },

  date: {
    color: '#7a7a7a',
    fontSize: 12,
  },

  main: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#222',
  },

  id: {
    marginTop: 8,
    color: '#8a8a8a',
    fontSize: 10,
  },
});