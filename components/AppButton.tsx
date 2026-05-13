import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  primary?: boolean;
};

export default function AppButton({
  title,
  onPress,
  primary = false,
}: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        primary ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          primary && styles.primaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },

  primary: {
    backgroundColor: '#3c7a3c',
  },

  secondary: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },

  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },

  primaryText: {
    color: '#fff',
  },
});