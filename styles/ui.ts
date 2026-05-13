import { StyleSheet } from 'react-native';

export const ui = StyleSheet.create({
  container: {
  paddingHorizontal: 10,
  paddingTop: 4,
  paddingBottom: 24,
  gap: 6,
},

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 4,
    lineHeight: 28,
  },

  subtitle: {
    fontSize: 13,
    color: '#6f6f6f',
    marginBottom: 10,
    lineHeight: 18,
  },

  input: {
  borderWidth: 1,
  borderColor: '#cfcfcf',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 4,
  backgroundColor: '#fff',
  fontSize: 14,
  minHeight: 34,
  height: 38,
},

  inputError: {
    borderColor: '#b00030',
    borderWidth: 2,
  },

  required: {
    color: '#b00030',
  },

  errorText: {
    color: '#b00030',
    fontSize: 13,
    marginTop: -2,
    marginBottom: 6,
  },

  section: {
    marginTop: 8,
    marginBottom: 6,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },

  card: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#f8fbf7',
  },
  
 stepHeader: {
  backgroundColor: '#fff4e8',
  borderWidth: 1,
  borderColor: '#ffd3a3',
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 10,
  marginTop: 8,
  marginBottom: 8,
},

stepTitle: {
  fontSize: 15,
  fontWeight: '700',
  color: '#d56b00',
},

formCard: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 14,
  padding: 12,
  gap: 6,
},

fieldGroup: {
  marginTop: 12,
},
});