import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ErrorState from "./components/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner";
import pokemonService from "./services/pokemonService";
import theme from "./styles/theme";
import PokemonTypes from "./types/pokemon";

const { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } = theme;
const { PokemonDetails } = PokemonTypes;

const { width } = Dimensions.get('window');

export default function Details() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const id = params.id as string;

    const [pokemon, setPokemon] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBackImage, setShowBackImage] = useState(false);

    useEffect(() => {
        if (id) {
            fetchPokemonDetails();
        }
    }, [id]);

    async function fetchPokemonDetails() {
        try {
            setLoading(true);
            setError(null);
            const data = await pokemonService.getPokemonFullDetails(id);
            if (!data) {
                setError("Pokemon not found");
                return;
            }
            setPokemon(data);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Failed to fetch pokemon details";
            setError(errorMessage);
            console.error("Error fetching pokemon details:", e);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingSpinner message="Loading Pokemon details..." />;
    }

    if (error || !pokemon) {
        return <ErrorState message={error || "Pokemon not found"} onRetry={fetchPokemonDetails} />;
    }

    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = COLORS[primaryType as keyof typeof COLORS] || COLORS.normal;
    const cardBackgroundColor = backgroundColor + '40';

    const toggleImage = () => {
        setShowBackImage(prev => !prev);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: cardBackgroundColor }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
                <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
            </View>

            {/* Main Image */}
            <TouchableOpacity onPress={toggleImage} style={styles.imageContainer}>
                <Image
                    source={{ uri: showBackImage ? pokemon.sprites.back_default : pokemon.sprites.front_default }}
                    style={styles.mainImage}
                    resizeMode="contain"
                />
                <Text style={styles.imageHint}>Tap to flip</Text>
            </TouchableOpacity>

            {/* Types */}
            <View style={styles.typesContainer}>
                {pokemon.types.map((type: any, index: number) => (
                    <View key={index} style={[styles.typeBadge, { backgroundColor: COLORS[type.type.name as keyof typeof COLORS] }]}>
                        <Text style={styles.typeText}>{type.type.name}</Text>
                    </View>
                ))}
            </View>

            {/* Basic Info */}
            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Basic Info</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Height</Text>
                        <Text style={styles.statValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Weight</Text>
                        <Text style={styles.statValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Base Exp</Text>
                        <Text style={styles.statValue}>{pokemon.base_experience}</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Stats</Text>
                <View style={styles.statsList}>
                    {pokemon.stats.map((stat: any, index: number) => (
                        <View key={index} style={styles.statRow}>
                            <Text style={styles.statName}>{stat.stat.name}</Text>
                            <View style={styles.statBarContainer}>
                                <View
                                    style={[
                                        styles.statBar,
                                        {
                                            width: `${Math.min(stat.base_stat, 100)}%`,
                                            backgroundColor: backgroundColor
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={styles.statNumber}>{stat.base_stat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Abilities */}
            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Abilities</Text>
                <View style={styles.abilitiesContainer}>
                    {pokemon.abilities.map((ability: any, index: number) => (
                        <View key={index} style={styles.abilityBadge}>
                            <Text style={styles.abilityText}>{ability.ability.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Moves Preview */}
            {pokemon.moves.length > 0 && (
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Sample Moves ({pokemon.moves.length} total)</Text>
                    <View style={styles.movesContainer}>
                        {pokemon.moves.slice(0, 6).map((move: any, index: number) => (
                            <View key={index} style={styles.moveBadge}>
                                <Text style={styles.moveText}>{move.move.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Sprites Gallery */}
            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Sprites Gallery</Text>
                <View style={styles.spritesGrid}>
                    {pokemon.sprites.front_default && (
                        <View style={styles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
                            <Text style={styles.spriteLabel}>Front</Text>
                        </View>
                    )}
                    {pokemon.sprites.back_default && (
                        <View style={styles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_default }} style={styles.sprite} />
                            <Text style={styles.spriteLabel}>Back</Text>
                        </View>
                    )}
                    {pokemon.sprites.front_shiny && (
                        <View style={styles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_shiny }} style={styles.sprite} />
                            <Text style={styles.spriteLabel}>Shiny</Text>
                        </View>
                    )}
                    {pokemon.sprites.back_shiny && (
                        <View style={styles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_shiny }} style={styles.sprite} />
                            <Text style={styles.spriteLabel}>Shiny Back</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: SPACING.md,
        gap: SPACING.md,
        paddingBottom: SPACING.xl,
        paddingTop: SPACING.lg + (StatusBar.currentHeight || 0),
    },
    header: {
        padding: SPACING.lg,
        borderRadius: SPACING.md,
        ...SHADOWS.medium,
    },
    backButton: {
        marginBottom: SPACING.sm,
    },
    backButtonText: {
        fontSize: TYPOGRAPHY.subtitle.fontSize,
        fontWeight: TYPOGRAPHY.subtitle.fontWeight,
        color: COLORS.text,
    },
    pokemonName: {
        fontSize: TYPOGRAPHY.header.fontSize,
        fontWeight: TYPOGRAPHY.header.fontWeight,
        color: COLORS.text,
        textTransform: 'capitalize',
    },
    pokemonId: {
        fontSize: TYPOGRAPHY.subtitle.fontSize,
        fontWeight: TYPOGRAPHY.subtitle.fontWeight,
        color: COLORS.textSecondary,
    },
    imageContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.lg,
        padding: SPACING.lg,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    mainImage: {
        width: width * 0.6,
        height: width * 0.6,
    },
    imageHint: {
        fontSize: TYPOGRAPHY.caption.fontSize,
        color: COLORS.textSecondary,
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
        color: COLORS.background,
        textTransform: 'capitalize',
    },
    infoCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.lg,
        padding: SPACING.lg,
        ...SHADOWS.medium,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.title.fontSize,
        fontWeight: TYPOGRAPHY.title.fontWeight,
        color: COLORS.text,
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
        color: COLORS.textSecondary,
    },
    statValue: {
        fontSize: TYPOGRAPHY.subtitle.fontSize,
        fontWeight: TYPOGRAPHY.subtitle.fontWeight,
        color: COLORS.text,
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
        color: COLORS.text,
        textTransform: 'capitalize',
        minWidth: 100,
    },
    statBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.border,
        borderRadius: SPACING.xs,
        overflow: 'hidden',
    },
    statBar: {
        height: '100%',
        borderRadius: SPACING.xs,
    },
    statNumber: {
        fontSize: TYPOGRAPHY.body.fontSize,
        color: COLORS.text,
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
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
    },
    abilityText: {
        fontSize: TYPOGRAPHY.body.fontSize,
        color: COLORS.background,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    movesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    moveBadge: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
    },
    moveText: {
        fontSize: TYPOGRAPHY.body.fontSize,
        color: COLORS.text,
        textTransform: 'capitalize',
    },
    spritesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
        justifyContent: 'space-between',
    },
    spriteWrapper: {
        alignItems: 'center',
        gap: SPACING.xs,
        flex: 1,
        minWidth: '48%',
    },
    sprite: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
    },
    spriteLabel: {
        fontSize: TYPOGRAPHY.caption.fontSize,
        color: COLORS.textSecondary,
        textTransform: 'capitalize',
    },
});