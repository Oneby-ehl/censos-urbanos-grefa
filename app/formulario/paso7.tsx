import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Vibration,
  ToastAndroid,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCenso } from '../../context/CensoContext';
import { guardarPendiente, marcarEnviado, marcarError } from '../../services/storage';
import { getApiUrl } from '../../services/settings';
import AppButton from '../../components/AppButton';
import SwipeStep from '../../components/SwipeStep';
import { ui } from '../../styles/ui';

const SECCIONES = [
  {
    titulo: 'Datos generales',
    campos: [
      ['identificador', 'Identificador'],
      ['fecha', 'Fecha'],
      ['provincia', 'Provincia'],
      ['municipio', 'Municipio'],
    ],
  },
  {
    titulo: 'Ubicación y edificio',
    campos: [
      ['localidad', 'Localidad'],
      ['direccion', 'Dirección'],
      ['nombre_edificio', 'Nombre edificio'],
      ['tipo_edificio', 'Tipo de edificio'],
      ['bic', 'BIC'],
    ],
  },
  {
    titulo: 'Obra, turno y horarios',
    campos: [
      ['alcance_obra', 'Alcance de obra'],
      ['turno', 'Turno'],
      ['hora_inicio', 'Hora inicio'],
      ['hora_fin', 'Hora fin'],
      ['tipo_estudio', 'Tipo estudio'],
    ],
  },
  {
    titulo: 'Administraciones y responsables',
    campos: [
      ['administraciones', 'Administraciones'],
      ['responsables_tecnicos', 'Responsables técnicos'],
      ['privados', 'Privados'],
    ],
  },
  {
    titulo: 'Censo de especie',
    campos: [
      ['especie', 'Especie'],
      ['numero_ejemplares', 'Número de ejemplares'],
      ['zona', 'Zona'],
    ],
  },
  {
    titulo: 'Ubicación y detalles técnicos',
    campos: [
      ['ubicacion', 'Ubicación'],
      ['nido_fabricado', 'Nido fabricado'],
      ['orientacion', 'Orientación'],
      ['detalles_tecnicos', 'Detalles técnicos'],
    ],
  },
];

function limpiarValor(valor: unknown) {
  if (typeof valor !== 'string') return String(valor ?? '');
  return valor.startsWith('OTRO:') ? valor.replace('OTRO:', '') : valor;
}

function dividirValores(valor: unknown) {
  const texto = limpiarValor(valor);

  return texto
    .split(',')
    .map((item) => limpiarValor(item.trim()))
    .filter(Boolean);
}

function validarCenso(censo: any) {
  const errores = [];

  if (!censo.identificador || String(censo.identificador).trim() === '') {
    errores.push('Identificador');
  }

  if (!censo.fecha || String(censo.fecha).trim() === '') {
    errores.push('Fecha');
  }

  if (!censo.especie || String(censo.especie).trim() === '') {
    errores.push('Especie');
  }

  if (
    !censo.numero_ejemplares ||
    String(censo.numero_ejemplares).trim() === '' ||
    isNaN(Number(censo.numero_ejemplares)) ||
    Number(censo.numero_ejemplares) <= 0
  ) {
    errores.push('Número de ejemplares válido');
  }

  return errores;
}
function feedbackGuardado() {
  Vibration.vibrate(80);

  if (Platform.OS === 'android') {
    ToastAndroid.show(
      'Censo guardado. Puedes registrar otra especie.',
      ToastAndroid.SHORT
    );
  }
}
export default function Paso7() {
  const router = useRouter();
  const { censo, prepararNuevoRegistroMismaUbicacion } = useCenso();

  const enviar = async () => {
    const errores = validarCenso(censo);

    if (errores.length > 0) {
      Alert.alert(
        'Faltan datos obligatorios',
        `Revisa estos campos:\n\n${errores.join('\n')}`
      );
      return;
    }

    const pendiente = await guardarPendiente(censo);

    try {
      const apiUrl = await getApiUrl();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...censo,
          id_local_app: pendiente.id_local_app,
        }),
      });

      const result = await response.json();

            if (result.status === 'OK') {
        await marcarEnviado(pendiente.id_local_app);
        feedbackGuardado();
      } else {
        await marcarError(pendiente.id_local_app);
        Alert.alert('Guardado pendiente', 'El censo se ha guardado, pero no se pudo enviar.');
      }

      prepararNuevoRegistroMismaUbicacion();
      router.replace('/formulario/paso5');
    } catch (error) {
      await marcarError(pendiente.id_local_app);
      Alert.alert(
        'Guardado pendiente',
        'No hay conexión o ha fallado el envío. El censo queda guardado en el móvil.'
      );

      prepararNuevoRegistroMismaUbicacion();
      router.replace('/formulario/paso5');
    }
  };

  return (
    <SwipeStep
      currentStep={6}
      totalSteps={6}
      previousRoute="/formulario/paso6"
    >
      <ScrollView contentContainerStyle={ui.container}>
        <Text style={ui.title}>Resumen del censo</Text>
        <Text style={ui.subtitle}>Revisa los datos antes de guardar y enviar.</Text>

        {SECCIONES.map((seccion) => {
          const camposConValor = seccion.campos.filter(([key]) => {
            const value = censo[key];
            return value !== undefined && value !== null && String(value).trim() !== '';
          });

          if (camposConValor.length === 0) return null;

          return (
            <View key={seccion.titulo} style={ui.card}>
              <Text style={styles.sectionTitle}>{seccion.titulo}</Text>

              {camposConValor.map(([key, label]) => {
                const valores = dividirValores(censo[key]);

                return (
                  <View key={key} style={styles.row}>
                    <Text style={styles.label}>{label}</Text>

                    {valores.length > 1 ? (
                      <View style={styles.valueList}>
                        {valores.map((valor, index) => (
                          <Text key={`${key}-${index}`} style={styles.value}>
                            • {valor}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.value}>{valores[0]}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

        <AppButton
          title="Guardar / Enviar censo"
          onPress={enviar}
          primary
        />
      </ScrollView>
    </SwipeStep>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    color: '#345',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    marginBottom: 2,
  },
  valueList: {
    marginTop: 2,
  },
});