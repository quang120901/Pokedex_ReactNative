import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';
import PokemonTypes from '../types/pokemon';

const { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } = theme;
const { PokemonCard: PokemonCardType } = PokemonTypes;

interface Props {
    pokemon: any;
    variant?: 'default' | 'compact';
}

export const PokemonCard: React.FC<Props> = ({ pokemon, variant = 'default' }) => {
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = COLORS[primaryType as keyof typeof COLORS] || COLORS.normal;
    const cardBackgroundColor = backgroundColor + '50'; // 30% opacity

    const cardContent = (
        <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.typeContainer}>
                {pokemon.types.map((type: any, index: number) => (
                    <View key={index} style={[styles.typeBadge, { backgroundColor: COLORS[type.type.name as keyof typeof COLORS] }]}>
                        <Text style={styles.typeText}>{type.type.name}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: pokemon.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                {variant === 'default' && pokemon.imageBack && (
                    <Image
                        source={{ uri: pokemon.imageBack }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
            </View>
            <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
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
        color: COLORS.text,
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
        color: COLORS.background,
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
        color: COLORS.textSecondary,
    },
});

export default PokemonCard;