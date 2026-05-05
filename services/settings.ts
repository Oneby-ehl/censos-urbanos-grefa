import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL_KEY = 'api_url';

export const DEFAULT_API_URL =
  'https://script.google.com/macros/s/AKfycbwNZoDRwNMr067Ln6fr24yv3XIPauCkhRQ0FWqQDfD02cLK0mB6v8O9sqOfdvzG8Sc85g/exec';

export async function getApiUrl(): Promise<string> {
  const value = await AsyncStorage.getItem(API_URL_KEY);
  return value || DEFAULT_API_URL;
}

export async function setApiUrl(url: string): Promise<void> {
  await AsyncStorage.setItem(API_URL_KEY, url.trim());
}