import { StyleSheet } from 'react-native';
import { SPACING } from '../spacing';
import { TYPOGRAPHY } from '../typography';

export const detailsStyles = StyleSheet.create({
  scrollContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    padding: SPACING.lg,
    borderRadius: SPACING.lg,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.md,
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
  },
  themeToggle: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  themeToggleEmoji: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeToggleText: {
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  headerContent: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  pokemonName: {
    fontSize: TYPOGRAPHY.header.fontSize,
    fontWeight: TYPOGRAPHY.header.fontWeight,
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
  },
  imageContainer: {
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageHint: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginTop: SPACING.sm,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    padding: SPACING.md,
    borderRadius: SPACING.lg,
  },
  typeBadge: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.xxl,
  },
  typeText: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
    textTransform: 'capitalize',
  },
  infoCard: {
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.title.fontSize,
    fontWeight: TYPOGRAPHY.title.fontWeight,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  statItem: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.caption.fontSize,
  },
  statValue: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
  },
  statsList: {
    gap: SPACING.sm,
  },
  statRow: {
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statName: {
    fontSize: 14,
    textTransform: 'capitalize',
    minWidth: 80,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: SPACING.xs,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  statBar: {
    height: '100%',
    borderRadius: SPACING.xs,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'right',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  abilityBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
  },
  abilityText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  moveBadge: {
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
  },
  moveText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  spritesGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  spriteWrapper: {
    alignItems: 'center',
    gap: SPACING.xs,
    width: 80,
  },
  sprite: {
    width: 80,
    height: 80,
    borderRadius: SPACING.sm,
    borderWidth: 1,
  },
  spriteLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

// Default export for Expo Router compatibility
export default { detailsStyles };