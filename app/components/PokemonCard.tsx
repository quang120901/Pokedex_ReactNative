import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import theme from '../styles/theme';

const { BORDER_RADIUS, SHADOWS, SPACING, TYPOGRAPHY } = theme;

interface Props {
    pokemon: any;
    variant?: 'default' | 'compact';
}

const PokemonCard: React.FC<Props> = ({ pokemon, variant = 'default' }) => {
    const { colors } = useTheme();
    const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
    const backgroundColor = colors[primaryType as keyof typeof colors] || colors.normal;
    const cardBackgroundColor = backgroundColor + '50'; // 30% opacity

    const cardContent = (
        <View style={[styles.card, {
            backgroundColor: cardBackgroundColor,
            shadowColor: colors.shadow,
            ...SHADOWS.medium
        }]}>
            <Text style={[styles.name, { color: colors.text }]}>{pokemon.name}</Text>
            <View style={styles.typeContainer}>
                {pokemon.types?.map((type: any, index: number) => (
                    <View key={index} style={[styles.typeBadge, { backgroundColor: colors[type.type.name as keyof typeof colors] || colors.normal }]}>
                        <Text style={[styles.typeText, { color: colors.background }]}>{type.type.name}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.imageContainer}>
                {pokemon.image && (
                    <Image
                        source={{ uri: pokemon.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                {variant === 'default' && pokemon.imageBack && (
                    <Image
                        source={{ uri: pokemon.imageBack }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
            </View>
            <Text style={[styles.id, { color: colors.textSecondary }]}>#{pokemon.id?.toString().padStart(3, '0') || '000'}</Text>
        </View>
    );

    return (
        <Link
            href={{ pathname: "/details", params: { id: pokemon.id.toString() } }}
            asChild
        >
            <TouchableOpacity activeOpacity={0.8}>
                {cardContent}
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        gap: SPACING.sm,
        ...SHADOWS.medium,
    },
    name: {
        ...TYPOGRAPHY.subtitle,
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.xs,
        flexWrap: 'wrap',
    },
    typeBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.pill,
    },
    typeText: {
        ...TYPOGRAPHY.small,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.sm,
    },
    image: {
        width: 80,
        height: 80,
    },
    id: {
        ...TYPOGRAPHY.caption,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default PokemonCard;