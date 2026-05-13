import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function FormSection({ title, children }: Props) {
  return (
    <View style={styles.section}>
      {!!title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#f4faf3',
    borderWidth: 1,
    borderColor: '#d9ead7',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3c7a3c',
    marginBottom: 8,
  },

  content: {
    gap: 6,
  },
});