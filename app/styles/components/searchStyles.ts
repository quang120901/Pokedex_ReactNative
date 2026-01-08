import { StyleSheet } from 'react-native';
import { SPACING } from '../spacing';

export const searchStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
    borderRadius: 24,
    padding: SPACING.sm,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 16,
    borderWidth: 0,
    fontWeight: '500',
  },
  button: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 18,
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

// Default export for Expo Router compatibility
export default { searchStyles };