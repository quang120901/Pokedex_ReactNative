import { StyleSheet } from 'react-native';

// Light Theme Colors
export const LIGHT_COLORS = {
  // Pokemon type colors
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',

  // UI Colors
  primary: '#DC3545',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowStrong: 'rgba(0, 0, 0, 0.2)',
};

// Dark Theme Colors
export const DARK_COLORS = {
  // Pokemon type colors (same as light for consistency)
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',

  // UI Colors
  primary: '#DC3545',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#E0E0E0',
  textSecondary: '#A0A0A0',
  border: '#333333',
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowStrong: 'rgba(0, 0, 0, 0.7)',
};

// Default to light theme colors
export const COLORS = LIGHT_COLORS;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 50,
};

export const TYPOGRAPHY = {
  header: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
};

export const SHADOWS = {
  small: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const ANIMATIONS = {
  timing: {
    short: 150,
    medium: 300,
    long: 500,
  },
};

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

// Index page specific styles
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

// Details page specific styles
export const detailsStyles = StyleSheet.create({
  scrollContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    padding: SPACING.lg,
    borderRadius: SPACING.md,
  },
  backButton: {
    marginBottom: SPACING.sm,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.subtitle.fontSize,
    fontWeight: TYPOGRAPHY.subtitle.fontWeight,
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
  },
  typeBadge: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.pill,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statName: {
    fontSize: TYPOGRAPHY.body.fontSize,
    textTransform: 'capitalize',
    minWidth: 100,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: SPACING.xs,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: SPACING.xs,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.body.fontSize,
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
    borderRadius: BORDER_RADIUS.md,
  },
  abilityText: {
    fontSize: TYPOGRAPHY.body.fontSize,
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
    borderRadius: BORDER_RADIUS.md,
  },
  moveText: {
    fontSize: TYPOGRAPHY.body.fontSize,
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
    fontSize: TYPOGRAPHY.caption.fontSize,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  SHADOWS,
  ANIMATIONS,
  globalStyles,
  indexStyles,
  detailsStyles,
};