import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useCenso } from '../../context/CensoContext';
import MultiSelectField from '../../components/MultiSelectField';
import SelectField from '../../components/SelectField';
import CompassField from '../../components/CompassField';
import SwipeStep from '../../components/SwipeStep';
import { UBICACIONES, SI_NO } from '../../constants/opciones';
import { ui } from '../../styles/ui';

export default function Paso6() {
  const { censo, updateCenso, opciones } = useCenso();

  return (
      <SwipeStep
        currentStep={5}
        totalSteps={6}
        previousRoute="/formulario/paso5"
        nextRoute="/formulario/paso7"
      >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={ui.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={ui.title}>Ubicación y detalles técnicos</Text>

          <MultiSelectField
            label="Ubicación"
            value={censo.ubicacion}
            options={opciones?.ubicaciones || UBICACIONES}
            onChange={(value) => updateCenso('ubicacion', value)}
          />

          <SelectField
            label="Nido fabricado"
            value={censo.nido_fabricado}
            options={SI_NO}
            onChange={(value) => updateCenso('nido_fabricado', value)}
          />

          <CompassField
            label="Orientación"
            value={censo.orientacion}
            onChange={(value) => updateCenso('orientacion', value)}
          />

          <Text>Detalles técnicos</Text>
          <TextInput
            style={[ui.input, styles.multiline]}
            multiline
            value={censo.detalles_tecnicos || ''}
            onChangeText={(text) => updateCenso('detalles_tecnicos', text)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}

const styles = StyleSheet.create({
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
});