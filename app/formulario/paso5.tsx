import {
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useRef, useState } from 'react';

import { useCenso } from '../../context/CensoContext';

import SelectField from '../../components/SelectField';
import MultiSelectField from '../../components/MultiSelectField';
import SwipeStep from '../../components/SwipeStep';
import AppButton from '../../components/AppButton';
import ActiveLocationCard from '../../components/ActiveLocationCard';
import CompassField from '../../components/CompassField';
import FormSection from '../../components/FormSection';

import {
  ESPECIES,
  ZONAS,
  UBICACIONES,
  SI_NO,
} from '../../constants/opciones';

import {
  guardarPendiente,
  marcarEnviado,
  marcarError,
} from '../../services/storage';

import { getApiUrl } from '../../services/settings';

import { ui } from '../../styles/ui';

export default function Paso5() {

  const { censo, updateCenso, opciones } = useCenso();

  const [enviando, setEnviando] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const limpiarValor = (
    valor: string | string[] | undefined
  ) => {
    if (Array.isArray(valor)) {
      return valor.join(', ');
    }

    return valor || '';
  };

  const prepararNuevoRegistroMismaUbicacion = () => {
    updateCenso('especie', '');
    updateCenso('numero_ejemplares', '');
  };

  const feedbackGuardado = () => {
    Alert.alert(
      'Dato enviado',
      `Especie: ${limpiarValor(censo.especie)}\nEjemplares: ${censo.numero_ejemplares || ''}`,
      [{ text: 'Aceptar' }]
    );
  };
  const confirmarEnvio = () => {

  const identificadorVacio =
    !censo.identificador ||
    String(censo.identificador).trim() === '';

  if (identificadorVacio) {

    Alert.alert(
      'Identificador obligatorio',
      'Debes introducir un identificador antes de guardar el dato.'
    );

    return;
  }

  if (especieVacia || numeroInvalido) {

    Alert.alert(
      'Dato incompleto',
      'No has introducido especie o número de ejemplares. ¿Deseas continuar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: enviar,
        },
      ]
    );

    return;
  }

  enviar();
};
  const enviar = async () => {
	  const url = await getApiUrl();
    try {
      setEnviando(true);

      const pendiente = await guardarPendiente(censo);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
            ...pendiente.datos,
            id_local_app: pendiente.id_local_app,
          }),
        });
				
        const result = await response.json();


        if (result.status === 'OK') {
          await marcarEnviado(pendiente.id_local_app);

          feedbackGuardado();

        } else {
          await marcarError(pendiente.id_local_app);

          Alert.alert(
           '✓ Guardado en el móvil',
           'El registro se ha guardado correctamente.\n\nSe enviará automáticamente cuando haya conexión.'
         );
        }

      } catch (error) {

        await marcarError(pendiente.id_local_app);

        Alert.alert(
         '✓ Guardado en el móvil',
         'El registro se ha guardado correctamente.\n\nSe enviará automáticamente cuando haya conexión.'
       );
      }

      scrollRef.current?.scrollTo({
		y: 0,
		animated: true,
		});

		setTimeout(() => {
		prepararNuevoRegistroMismaUbicacion();
	  }, 250);
	
    } finally {
      setEnviando(false);
    }
  };

  const especieVacia =
    !censo.especie ||
    String(censo.especie).trim() === '';

  const numeroInvalido =
    !censo.numero_ejemplares ||
    String(censo.numero_ejemplares).trim() === '' ||
    isNaN(Number(censo.numero_ejemplares)) ||
    Number(censo.numero_ejemplares) <= 0;

  return (
    <SwipeStep
      currentStep={3}
      totalSteps={3}
      previousRoute="/formulario/paso3"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios'
          ? 'padding'
          : 'height'}
      >
        <ScrollView
		ref={scrollRef}
		contentContainerStyle={ui.container}
		keyboardShouldPersistTaps="handled"
		>
          <View style={ui.stepHeader}>
            <Text style={ui.stepTitle}>
              CENSO DE ESPECIES
            </Text>
          </View>

          <View style={ui.formCard}>
            <ActiveLocationCard />

                <FormSection title="Especie y ejemplares">
                
                  <Text>
                    Especie <Text style={ui.required}>*</Text>
                  </Text>
                
                  <SelectField
                    label=""
                    value={
                      Array.isArray(censo.especie)
                        ? ''
                        : censo.especie || ''
                    }
                    options={[
                      ...(
                        opciones?.especies ||
                        ESPECIES
                      ).filter(
                        (item) => item !== 'OTRO-escribir'
                      ),
                      'OTRO-escribir',
                    ]}
                    onChange={(value) =>
                      updateCenso('especie', value)
                    }
                  />
                
                  {especieVacia && (
                    <Text style={ui.errorText}>
                      Campo obligatorio
                    </Text>
                  )}
                
                  <Text>
                    Número de ejemplares{' '}
                    <Text style={ui.required}>*</Text>
                  </Text>
                
                  <TextInput
                    style={[
                      ui.input,
                      numeroInvalido && ui.inputError,
                    ]}
                    keyboardType="numeric"
                    value={censo.numero_ejemplares || ''}
                    onChangeText={(text) =>
                      updateCenso('numero_ejemplares', text)
                    }
                  />
                
                  {numeroInvalido && (
                    <Text style={ui.errorText}>
                      Introduce un número mayor que 0
                    </Text>
                  )}
                
                </FormSection>
                
                <FormSection title="Ubicación y nidificación">
                
                  <MultiSelectField
                    label="Zona"
                    value={censo.zona}
                    options={opciones?.zonas || ZONAS}
                    onChange={(value) =>
                      updateCenso('zona', value)
                    }
                  />
                
                  <MultiSelectField
                    label="Ubicación"
                    value={censo.ubicacion}
                    options={opciones?.ubicaciones || UBICACIONES}
                    onChange={(value) =>
                      updateCenso('ubicacion', value)
                    }
                  />
                
                  <SelectField
                    label="Nido fabricado"
                    value={censo.nido_fabricado}
                    options={SI_NO}
                    onChange={(value) =>
                      updateCenso('nido_fabricado', value)
                    }
                  />
                
                </FormSection>
                
                <FormSection title="Orientación y detalles">
                
                  <CompassField
                    label="Orientación"
                    value={censo.orientacion}
                    onChange={(value) =>
                      updateCenso('orientacion', value)
                    }
                  />
                
                  <Text>Detalles técnicos</Text>
                
                  <TextInput
                    style={[
                      ui.input,
                      {
                        height: 70,
                        minHeight: 70,
                        textAlignVertical: 'top',
                      },
                    ]}
                    multiline
                    value={censo.detalles_tecnicos || ''}
                    onChangeText={(text) =>
                      updateCenso('detalles_tecnicos', text)
                    }
                  />
                
                </FormSection>

            <View
              style={{
                marginTop: 18,
                marginBottom: 12,
              }}
            >
              {enviando ? (
                <View
                  style={{
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <ActivityIndicator size="large" />
                  <Text>Enviando dato...</Text>
                </View>

              ) : (
                <AppButton
				title="Guardar/Enviar dato"
				onPress={confirmarEnvio}
				primary
				/>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SwipeStep>
  );
}