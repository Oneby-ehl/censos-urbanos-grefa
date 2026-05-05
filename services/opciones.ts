import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from './settings';

const OPCIONES_CACHE_KEY = 'opciones_cache';

export async function fetchOpciones() {
  try {
    const baseUrl = await getApiUrl();
    const response = await fetch(`${baseUrl}?action=opciones`);
    const data = await response.json();

    if (data.status === 'OK' && data.opciones) {
      await AsyncStorage.setItem(
        OPCIONES_CACHE_KEY,
        JSON.stringify(data.opciones)
      );

      return data.opciones;
    }

    return await getOpcionesCache();
  } catch (error) {
    return await getOpcionesCache();
  }
}

export async function getOpcionesCache() {
  const raw = await AsyncStorage.getItem(OPCIONES_CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearOpcionesCache() {
  await AsyncStorage.removeItem(OPCIONES_CACHE_KEY);
}