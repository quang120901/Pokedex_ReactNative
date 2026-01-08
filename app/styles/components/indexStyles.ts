import { StyleSheet } from 'react-native';
import { SPACING } from '../spacing';
import { TYPOGRAPHY } from '../typography';

export const indexStyles = StyleSheet.create({
  scrollContainer: {
    gap: SPACING.md,
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.header.fontSize,
    fontWeight: TYPOGRAPHY.header.fontWeight,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    opacity: 0.9,
  },
  grid: {
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
  },
  loadingMoreContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  endMessage: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  endText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontStyle: 'italic',
  },
});

// Default export for Expo Router compatibility
export default { indexStyles };