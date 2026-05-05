import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { ui } from '../styles/ui';

type Props = {
  label: string;
  value?: string;
  placeholder?: string;
  icon: string;
  onChangeText: (text: string) => void;
  onPressIcon: () => void;
};

export default function PickerInput({
  label,
  value,
  placeholder,
  icon,
  onChangeText,
  onPressIcon,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      <View style={styles.row}>
        <TextInput
          style={[ui.input, styles.input]}
          value={value || ''}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />

        <Pressable style={styles.iconButton} onPress={onPressIcon}>
          <Text style={styles.icon}>{icon}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    width: '55%',
    marginRight: 10,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#f8fbf7',
  },
  icon: {
    fontSize: 22,
  },
});