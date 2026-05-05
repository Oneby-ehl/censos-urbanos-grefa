import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#3c7a3c',
  card: '#f8fbf7',
  border: '#d0d0d0',
  text: '#000',
  textSecondary: 'gray',
};

export const ui = StyleSheet.create({
  container: {
  padding: 20,
  paddingTop: 55,
  paddingBottom: 80,
},
inputError: {
  borderColor: '#b00020',
  borderWidth: 2,
},
required: {
  color: '#b00020',
  fontWeight: 'bold',
},
errorText: {
  color: '#b00020',
  fontSize: 12,
  marginTop: -10,
  marginBottom: 12,
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 8,
},

subtitle: {
  fontSize: 17,
  color: colors.textSecondary,
  marginBottom: 22,
},
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: colors.card,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  buttonTextPrimary: {
    color: '#fff',
  },
  input: {
  borderWidth: 1,
  borderColor: '#999',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
  backgroundColor: '#fff',
  },
});