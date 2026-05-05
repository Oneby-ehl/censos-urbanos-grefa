import NetInfo from '@react-native-community/netinfo';
import { obtenerPendientes, marcarEnviado, marcarError } from './storage';
import { getApiUrl } from './settings';

export async function sincronizarPendientes(): Promise<number> {
  const net = await NetInfo.fetch();

  if (!net.isConnected) {
    return 0;
  }

  const pendientes = await obtenerPendientes();
  let enviados = 0;

  const apiUrl = await getApiUrl();

  for (const item of pendientes) {
    if (item.estado === 'enviado') {
      continue;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...item.datos,
          id_local_app: item.id_local_app,
        }),
      });

      const result = await response.json();

      if (result.status === 'OK') {
        await marcarEnviado(item.id_local_app);
        enviados++;
      } else {
        await marcarError(item.id_local_app);
      }
    } catch (error) {
      await marcarError(item.id_local_app);
    }
  }

  return enviados;
}