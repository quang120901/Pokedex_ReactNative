import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from '../spacing';
import { TYPOGRAPHY } from '../typography';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  header: {
    padding: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.header.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    gap: SPACING.sm,
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  gap: {
    gap: SPACING.sm,
  },
});

// Default export for Expo Router compatibility
export default { globalStyles };