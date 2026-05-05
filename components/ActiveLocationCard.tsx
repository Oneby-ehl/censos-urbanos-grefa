import { View, Text, StyleSheet } from 'react-native';
import { useCenso } from '../context/CensoContext';
import { ui } from '../styles/ui';

export default function ActiveLocationCard() {
  const { censo } = useCenso();

  const titulo =
    censo.nombre_edificio ||
    censo.direccion ||
    censo.localidad ||
    censo.municipio ||
    'Ubicación sin indicar';

  const detalle = [
    censo.municipio,
    censo.provincia,
  ].filter(Boolean).join(' · ');

  return (
    <View style={ui.card}>
      <Text style={styles.label}>Ubicación activa</Text>
      <Text style={styles.title}>{titulo}</Text>
      {detalle !== '' && <Text style={styles.detail}>{detalle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#345',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    marginTop: 3,
    color: 'gray',
  },
});