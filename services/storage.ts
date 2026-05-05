import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'censos_pendientes';
const DIAS_RETENCION_ENVIADOS = 2;

export type CensoPendiente = {
  id_local_app: string;
  estado: 'pendiente' | 'enviado' | 'error';
  creado_en: string;
  datos: Record<string, any>;
};

function esEnviadoAntiguo(item: CensoPendiente) {
  if (item.estado !== 'enviado') return false;

  const creado = new Date(item.creado_en).getTime();
  const limite = Date.now() - DIAS_RETENCION_ENVIADOS * 24 * 60 * 60 * 1000;

  return creado < limite;
}

export async function obtenerPendientes(): Promise<CensoPendiente[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function limpiarEnviadosAntiguos(): Promise<void> {
  const registros = await obtenerPendientes();

  const filtrados = registros.filter((item) => !esEnviadoAntiguo(item));

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
}

export async function guardarPendiente(datos: Record<string, any>): Promise<CensoPendiente> {
  await limpiarEnviadosAntiguos();

  const pendientes = await obtenerPendientes();

  const nuevo: CensoPendiente = {
    id_local_app: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    estado: 'pendiente',
    creado_en: new Date().toISOString(),
    datos,
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...pendientes, nuevo]));

  return nuevo;
}

export async function marcarEnviado(idLocal: string): Promise<void> {
  const pendientes = await obtenerPendientes();

  const actualizados = pendientes.map((item) =>
    item.id_local_app === idLocal
      ? { ...item, estado: 'enviado' as const }
      : item
  );

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));

  await limpiarEnviadosAntiguos();
}

export async function marcarError(idLocal: string): Promise<void> {
  const pendientes = await obtenerPendientes();

  const actualizados = pendientes.map((item) =>
    item.id_local_app === idLocal
      ? { ...item, estado: 'error' as const }
      : item
  );

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
}