import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

const GRID = [
  ['NO', 'N', 'NE'],
  ['O', 'CENTER', 'E'],
  ['SO', 'S', 'SE'],
];

const CELL_SIZE = 48;

export default function CompassField({ label, value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.compassBox}>
        {GRID.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell) => {
              if (cell === 'CENTER') {
                return (
                  <View key={cell} style={styles.center}>
                    <Text style={styles.centerIcon}>✦</Text>
                  </View>
                );
              }

              const selected = value === cell;

              return (
                <Pressable
                  key={cell}
                  onPress={() => onChange(cell)}
                  style={[
                    styles.direction,
                    selected && styles.directionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.directionText,
                      selected && styles.directionTextSelected,
                    ]}
                  >
                    {cell}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
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
  compassBox: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 16,
    padding: 8,
    backgroundColor: '#f8fbf7',
  },
  row: {
    flexDirection: 'row',
  },
  direction: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
  },
  directionSelected: {
    backgroundColor: '#3c7a3c',
    borderColor: '#3c7a3c',
  },
  directionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  directionTextSelected: {
    color: '#fff',
  },
  center: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef5ee',
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  centerIcon: {
    fontSize: 22,
    color: '#3c7a3c',
  },
});