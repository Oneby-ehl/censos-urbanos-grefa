import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';

type SelectFieldProps = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
};

const OTRO_OPTION = 'OTRO-escribir';

export default function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {

  const safeValue =
    typeof value === 'string'
      ? value
      : '';

  const isOtroSelected =
    safeValue.startsWith('OTRO:') ||
    safeValue === OTRO_OPTION;

  const otroText =
    safeValue.startsWith('OTRO:')
      ? safeValue.replace('OTRO:', '')
      : '';

  return (
    <View style={styles.container}>
      {!!label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View style={styles.options}>
        {options.map((option) => {

          const selected =
            safeValue === option ||
            (option === OTRO_OPTION && isOtroSelected);

          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[
                styles.option,
                selected && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {option === OTRO_OPTION
                  ? 'Otro'
                  : option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isOtroSelected && (
        <TextInput
          style={styles.inputOtro}
          placeholder={`Escribir otro valor`}
          value={otroText}
          onChangeText={(text) =>
            onChange(`OTRO:${text}`)
          }
          autoCorrect={false}
          autoCapitalize="sentences"
          returnKeyType="done"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  label: {
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
    color: '#222',
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  option: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: '#cfcfcf',
    backgroundColor: '#fff',
  },

  optionSelected: {
    backgroundColor: '#d8ead7',
    borderColor: '#3c7a3c',
  },

  optionText: {
    fontSize: 13,
    color: '#222',
  },

  optionTextSelected: {
    fontWeight: '600',
    color: '#245c24',
  },

  inputOtro: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
});