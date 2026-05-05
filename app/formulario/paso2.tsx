import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCenso } from '../../context/CensoContext';
import MultiSelectField from '../../components/MultiSelectField';
import SelectField from '../../components/SelectField';
import SwipeStep from '../../components/SwipeStep';
import { SI_NO, TIPOS_EDIFICIO } from '../../constants/opciones';
import { ui } from '../../styles/ui';

export default function Paso2() {
  const { censo, updateCenso, opciones } = useCenso();

  return (
    <SwipeStep
      currentStep={2}
      totalSteps={7}
      previousRoute="/formulario/paso1"
      nextRoute="/formulario/paso3"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={ui.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={ui.title}>Ubicación y edificio</Text>

          <Text>Localidad</Text>
          <TextInput
            style={ui.input}
            value={censo.localidad || ''}
            onChangeText={(text) => updateCenso('localidad', text)}
          />

          <Text>Dirección</Text>
          <TextInput
            style={ui.input}
            value={censo.direccion || ''}
            onChangeText={(text) => updateCenso('direccion', text)}
          />

          <Text>Nombre edificio</Text>
          <TextInput
            style={ui.input}
            value={censo.nombre_edificio || ''}
            onChangeText={(text) => updateCenso('nombre_edificio', text)}
          />

          <MultiSelectField
            label="Tipo de edificio"
            value={censo.tipo_edificio}
            options={[
              ...(opciones?.tipos_edificio || TIPOS_EDIFICIO)
            ]}
            onChange={(value) => updateCenso('tipo_edificio', value)}
          />

          <SelectField
            label="BIC"
            value={censo.bic}
            options={SI_NO}
            onChange={(value) => updateCenso('bic', value)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}