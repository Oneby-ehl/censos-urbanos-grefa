import { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCenso } from '../../context/CensoContext';
import PickerInput from '../../components/PickerInput';
import MultiSelectField from '../../components/MultiSelectField';
import SelectField from '../../components/SelectField';
import SwipeStep from '../../components/SwipeStep';
import { SI_NO, TIPOS_EDIFICIO } from '../../constants/opciones';
import { ui } from '../../styles/ui';

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function Paso1() {
  const { censo, updateCenso, opciones } = useCenso();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const identificadorVacio =
    !censo.identificador || String(censo.identificador).trim() === '';

  const fechaVacia =
    !censo.fecha || String(censo.fecha).trim() === '';

  useEffect(() => {
    if (!censo.fecha) {
      updateCenso('fecha', formatDate(new Date()));
    }
  }, []);

  const abrirCalendario = () => {
    setShowDatePicker(true);
  };

  const onChangeFecha = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      updateCenso('fecha', formatDate(selectedDate));
    }
  };

  return (
    <SwipeStep
      currentStep={1}
      totalSteps={6}
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
          <Text style={ui.title}>Datos generales y edificio</Text>

          <Text>
            Identificador <Text style={ui.required}>*</Text>
          </Text>
          <TextInput
            style={[ui.input, identificadorVacio && ui.inputError]}
            value={censo.identificador || ''}
            onChangeText={(text) => updateCenso('identificador', text)}
          />
          {identificadorVacio && (
            <Text style={ui.errorText}>Campo obligatorio</Text>
          )}

          <Text>
            Fecha <Text style={ui.required}>*</Text>
          </Text>
          <PickerInput
            label=""
            value={censo.fecha}
            placeholder="YYYY-MM-DD"
            icon="📅"
            onChangeText={(text) => updateCenso('fecha', text)}
            onPressIcon={abrirCalendario}
          />
          {fechaVacia && (
            <Text style={ui.errorText}>Campo obligatorio</Text>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={censo.fecha ? new Date(censo.fecha) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeFecha}
            />
          )}

          <Text>Provincia</Text>
          <TextInput
            style={ui.input}
            value={censo.provincia || ''}
            onChangeText={(text) => updateCenso('provincia', text)}
          />

          <Text>Municipio</Text>
          <TextInput
            style={ui.input}
            value={censo.municipio || ''}
            onChangeText={(text) => updateCenso('municipio', text)}
          />

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
            options={opciones?.tipos_edificio || TIPOS_EDIFICIO}
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