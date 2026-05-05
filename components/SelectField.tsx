import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

type SelectFieldProps = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
};

const OTRO_OPTION = 'OTRO-escribir';

export default function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  const isOtroSelected = value?.startsWith('OTRO:') || value === OTRO_OPTION;

  const otroText = value?.startsWith('OTRO:')
    ? value.replace('OTRO:', '')
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.options}>
        {options.map((option) => {
          const selected =
            value === option ||
            (option === OTRO_OPTION && isOtroSelected);

          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {option === OTRO_OPTION ? 'Otro' : option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isOtroSelected && (
        <TextInput
          style={styles.inputOtro}
          placeholder={`Escribir otro valor para ${label.toLowerCase()}`}
          value={otroText}
          onChangeText={(text) => onChange(`OTRO:${text}`)}
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
    marginBottom: 22,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#999',
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#d8ead7',
    borderColor: '#3c7a3c',
  },
  optionText: {
    fontSize: 14,
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  inputOtro: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
});