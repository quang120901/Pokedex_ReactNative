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

// Default export for Expo Router compatibility
export default { LIGHT_COLORS, DARK_COLORS, COLORS };