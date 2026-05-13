import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useCenso } from '../../context/CensoContext';
import MultiSelectField from '../../components/MultiSelectField';
import SwipeStep from '../../components/SwipeStep';
import { ADMINISTRACIONES } from '../../constants/opciones';
import { ui } from '../../styles/ui';

export default function Paso4() {
  const { censo, updateCenso, opciones } = useCenso();

  return (
    <SwipeStep
      currentStep={3}
      totalSteps={4}
      previousRoute="/formulario/paso3"
      nextRoute="/formulario/paso5"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={ui.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={ui.stepHeader}>
            <Text style={ui.stepTitle}>
              Administraciones y responsables
            </Text>
          </View>

          <View style={ui.formCard}>
            <MultiSelectField
              label="Administraciones"
              value={censo.administraciones}
              options={opciones?.administraciones || ADMINISTRACIONES}
              onChange={(value) => updateCenso('administraciones', value)}
            />

            <Text>Responsables técnicos</Text>
            <TextInput
              style={ui.input}
              value={censo.responsables_tecnicos || ''}
              onChangeText={(text) =>
                updateCenso('responsables_tecnicos', text)
              }
            />

            <Text>Privados</Text>
            <TextInput
              style={ui.input}
              value={censo.privados || ''}
              onChangeText={(text) => updateCenso('privados', text)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}