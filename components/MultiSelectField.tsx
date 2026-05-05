import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

type Props = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
};

const OTRO_OPTION = 'OTRO-escribir';

function toArray(value?: string) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function withOtro(options: string[]) {
  const clean = options.filter((item) => item !== OTRO_OPTION);
  return [...clean, OTRO_OPTION];
}

export default function MultiSelectField({ label, value, options, onChange }: Props) {
  const finalOptions = withOtro(options);
  const selectedValues = toArray(value);
  const otroValue = selectedValues.find((item) => item.startsWith('OTRO:'));
  const isOtroSelected = Boolean(otroValue);

  const toggleValue = (option: string) => {
    let nextValues = [...selectedValues];

    if (option === OTRO_OPTION) {
      if (isOtroSelected) {
        nextValues = nextValues.filter((item) => !item.startsWith('OTRO:'));
      } else {
        nextValues.push('OTRO:');
      }

      onChange(nextValues.join(', '));
      return;
    }

    if (nextValues.includes(option)) {
      nextValues = nextValues.filter((item) => item !== option);
    } else {
      nextValues.push(option);
    }

    onChange(nextValues.join(', '));
  };

  const updateOtro = (text: string) => {
    let nextValues = selectedValues.filter((item) => !item.startsWith('OTRO:'));

    if (text.trim() !== '') {
      nextValues.push(`OTRO:${text}`);
    } else {
      nextValues.push('OTRO:');
    }

    onChange(nextValues.join(', '));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.options}>
        {finalOptions.map((option) => {
          const selected =
            selectedValues.includes(option) ||
            (option === OTRO_OPTION && isOtroSelected);

          return (
            <Pressable
              key={option}
              onPress={() => toggleValue(option)}
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
          value={otroValue?.replace('OTRO:', '') || ''}
          onChangeText={updateOtro}
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
});