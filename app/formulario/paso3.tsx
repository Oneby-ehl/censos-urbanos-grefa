import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCenso } from '../../context/CensoContext';
import SelectField from '../../components/SelectField';
import FormSection from '../../components/FormSection';
import MultiSelectField from '../../components/MultiSelectField';
import SwipeStep from '../../components/SwipeStep';
import PickerInput from '../../components/PickerInput';
import {
  ALCANCES_OBRA,
  TURNOS,
  ADMINISTRACIONES,
} from '../../constants/opciones';
import { ui } from '../../styles/ui';

function formatTime(date: Date) {
  return date.toTimeString().slice(0, 5);
}

export default function Paso3() {
  const { censo, updateCenso, opciones } = useCenso();

  const [showInicio, setShowInicio] = useState(false);
  const [showFin, setShowFin] = useState(false);

  const onChangeInicio = (_: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowInicio(false);
    if (selectedDate) updateCenso('hora_inicio', formatTime(selectedDate));
  };

  const onChangeFin = (_: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowFin(false);
    if (selectedDate) updateCenso('hora_fin', formatTime(selectedDate));
  };

  return (
    <SwipeStep
      currentStep={2}
      totalSteps={3}
      previousRoute="/formulario/paso1"
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
              OBRA / TURNO / ADMINISTRACIONES
            </Text>
          </View>

          <View style={ui.formCard}>
            <FormSection title="Obra, turno y horario">

              <MultiSelectField
                label="Alcance de obra"
                value={censo.alcance_obra}
                options={opciones?.alcances_obra || ALCANCES_OBRA}
                onChange={(value) => updateCenso('alcance_obra', value)}
              />
            
              <SelectField
                label="Turno"
                value={censo.turno}
                options={opciones?.turnos || TURNOS}
                onChange={(value) => updateCenso('turno', value)}
              />
            
              <PickerInput
                label="Hora inicio"
                value={censo.hora_inicio}
                placeholder="HH:MM"
                icon="🕘"
                onChangeText={(text) => updateCenso('hora_inicio', text)}
                onPressIcon={() => setShowInicio(true)}
              />
            
              {showInicio && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={onChangeInicio}
                />
              )}
            
              <PickerInput
                label="Hora fin"
                value={censo.hora_fin}
                placeholder="HH:MM"
                icon="🕘"
                onChangeText={(text) => updateCenso('hora_fin', text)}
                onPressIcon={() => setShowFin(true)}
              />
            
              {showFin && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={onChangeFin}
                />
              )}
            
              <Text>Tipo estudio</Text>
            
              <TextInput
                style={ui.input}
                value={censo.tipo_estudio || ''}
                onChangeText={(text) => updateCenso('tipo_estudio', text)}
              />
            
            </FormSection>
            
            <FormSection title="Administraciones y responsables">
            
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
            
            </FormSection>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}