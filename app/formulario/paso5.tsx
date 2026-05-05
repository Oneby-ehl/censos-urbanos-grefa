import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCenso } from '../../context/CensoContext';
import SelectField from '../../components/SelectField';
import MultiSelectField from '../../components/MultiSelectField';
import SwipeStep from '../../components/SwipeStep';
import AppButton from '../../components/AppButton';
import ActiveLocationCard from '../../components/ActiveLocationCard';
import { ESPECIES, ZONAS } from '../../constants/opciones';
import { ui } from '../../styles/ui';

export default function Paso5() {
  const router = useRouter();
  const { censo, updateCenso, resetCenso, opciones } = useCenso();

  const especieVacia =
    !censo.especie || String(censo.especie).trim() === '';

  const numeroInvalido =
    !censo.numero_ejemplares ||
    String(censo.numero_ejemplares).trim() === '' ||
    isNaN(Number(censo.numero_ejemplares)) ||
    Number(censo.numero_ejemplares) <= 0;

  const finalizarUbicacion = () => {
    resetCenso();
    router.replace('/');
  };

  return (
    <SwipeStep
      currentStep={4}
      totalSteps={6}
      previousRoute="/formulario/paso4"
      nextRoute="/formulario/paso6"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={ui.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={ui.title}>Censo de especie</Text>

          <ActiveLocationCard />

          <Text>
            Especie <Text style={ui.required}>*</Text>
          </Text>
          <SelectField
            label=""
            value={censo.especie}
            options={[
              ...(opciones?.especies || ESPECIES),
              'OTRO-escribir',
            ]}
            onChange={(value) => updateCenso('especie', value)}
          />
          {especieVacia && (
            <Text style={ui.errorText}>Campo obligatorio</Text>
          )}

          <Text>
            Número de ejemplares <Text style={ui.required}>*</Text>
          </Text>
          <TextInput
            style={[ui.input, numeroInvalido && ui.inputError]}
            keyboardType="numeric"
            value={censo.numero_ejemplares || ''}
            onChangeText={(text) => updateCenso('numero_ejemplares', text)}
          />
          {numeroInvalido && (
            <Text style={ui.errorText}>Introduce un número mayor que 0</Text>
          )}

          <MultiSelectField
            label="Zona"
            value={censo.zona}
            options={opciones?.zonas || ZONAS}
            onChange={(value) => updateCenso('zona', value)}
          />

          <AppButton
            title="Finalizar ubicación"
            onPress={finalizarUbicacion}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}