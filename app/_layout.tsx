import { Stack } from 'expo-router';
import { CensoProvider } from '../context/CensoContext';

export default function Layout() {
  return (
    <CensoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CensoProvider>
  );
}