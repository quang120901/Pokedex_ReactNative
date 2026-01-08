import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useTheme } from "../utils/ThemeContext";
import ErrorState from "./components/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner";
import pokemonService from "./services/pokemonService";
import { detailsStyles } from "./styles/components/detailsStyles";
import { SHADOWS } from "./styles/shadows";
import { SPACING } from "./styles/spacing";

const { width } = Dimensions.get('window');

export default function Details() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const id = params.id as string;

    const [pokemon, setPokemon] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBackImage, setShowBackImage] = useState(false);

    const { theme: themeMode, toggleTheme, colors } = useTheme();

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

    const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
    const backgroundColor = colors[primaryType as keyof typeof colors] || colors.normal;
    const cardBackgroundColor = backgroundColor + '40';

    const toggleImage = () => {
        setShowBackImage(prev => !prev);
    };

    return (
        <ScrollView
            contentContainerStyle={[detailsStyles.scrollContainer, { paddingTop: SPACING.lg + (StatusBar.currentHeight || 0) }]}
            style={{ backgroundColor: colors.background }}
        >
            {/* Header with Theme Toggle */}
            <View style={[detailsStyles.header, {
                backgroundColor: cardBackgroundColor,
                shadowColor: colors.shadow,
                ...SHADOWS.medium
            }]}>
                <View style={detailsStyles.headerTopRow}>
                    <TouchableOpacity onPress={() => router.back()} style={[detailsStyles.backButton, { backgroundColor: colors.background }]}>
                        <Text style={[detailsStyles.backButtonText, { color: colors.text }]}>← Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={[detailsStyles.themeToggle, {
                            backgroundColor: themeMode === 'light' ? colors.background : colors.surface,
                            borderColor: colors.background
                        }]}
                    >
                        <Text style={detailsStyles.themeToggleEmoji}>
                            {themeMode === 'light' ? '🌙' : '☀️'}
                        </Text>
                        <Text style={[detailsStyles.themeToggleText, {
                            color: themeMode === 'light' ? colors.text : colors.textSecondary
                        }]}>
                            {themeMode === 'light' ? 'Dark' : 'Light'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={detailsStyles.headerContent}>
                    <Text style={[detailsStyles.pokemonName, { color: colors.text }]}>{pokemon.name || 'Unknown'}</Text>
                    <Text style={[detailsStyles.pokemonId, { color: colors.textSecondary }]}>#{pokemon.id?.toString().padStart(3, '0') || '000'}</Text>
                </View>
            </View>

            {/* Main Image */}
            <TouchableOpacity onPress={toggleImage} style={[detailsStyles.imageContainer, {
                shadowColor: colors.shadow,
                ...SHADOWS.medium,
                backgroundColor: colors.background
            }]}>
                {pokemon.sprites?.front_default && (
                    <Image
                        source={{ uri: showBackImage ? (pokemon.sprites.back_default || pokemon.sprites.front_default) : pokemon.sprites.front_default }}
                        style={[detailsStyles.mainImage, { width: width * 0.6, height: width * 0.6 }]}
                        resizeMode="contain"
                    />
                )}
                <Text style={[detailsStyles.imageHint, { color: colors.textSecondary }]}>Tap to flip</Text>
            </TouchableOpacity>

            {/* Types */}
            <View style={[detailsStyles.typesContainer, {
                backgroundColor: colors.background,
                ...SHADOWS.small
            }]}>
                {pokemon.types?.map((type: any, index: number) => (
                    <View key={index} style={[detailsStyles.typeBadge, {
                        backgroundColor: colors[type.type.name as keyof typeof colors] || colors.normal
                    }]}>
                        <Text style={[detailsStyles.typeText, { color: '#FFFFFF' }]}>{type.type.name}</Text>
                    </View>
                ))}
            </View>

            {/* Basic Info */}
            <View style={[detailsStyles.infoCard, {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
                ...SHADOWS.medium
            }]}>
                <Text style={[detailsStyles.sectionTitle, { color: colors.text }]}>Basic Info</Text>
                <View style={detailsStyles.statsGrid}>
                    <View style={[detailsStyles.statItem, { backgroundColor: colors.surface }]}>
                        <Text style={[detailsStyles.statLabel, { color: colors.textSecondary }]}>Height</Text>
                        <Text style={[detailsStyles.statValue, { color: colors.text }]}>{pokemon.height ? (pokemon.height / 10).toFixed(1) : '0.0'} m</Text>
                    </View>
                    <View style={[detailsStyles.statItem, { backgroundColor: colors.surface }]}>
                        <Text style={[detailsStyles.statLabel, { color: colors.textSecondary }]}>Weight</Text>
                        <Text style={[detailsStyles.statValue, { color: colors.text }]}>{pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '0.0'} kg</Text>
                    </View>
                    <View style={[detailsStyles.statItem, { backgroundColor: colors.surface }]}>
                        <Text style={[detailsStyles.statLabel, { color: colors.textSecondary }]}>Base Exp</Text>
                        <Text style={[detailsStyles.statValue, { color: colors.text }]}>{pokemon.base_experience || '0'}</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={[detailsStyles.infoCard, {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
                ...SHADOWS.medium
            }]}>
                <Text style={[detailsStyles.sectionTitle, { color: colors.text }]}>Stats</Text>
                <View style={detailsStyles.statsList}>
                    {pokemon.stats?.map((stat: any, index: number) => (
                        <View key={index} style={[detailsStyles.statRow, { backgroundColor: colors.surface }]}>
                            <Text style={[detailsStyles.statName, { color: colors.text }]}>{stat.stat.name}</Text>
                            <View style={[detailsStyles.statBarContainer, { backgroundColor: colors.border }]}>
                                <View
                                    style={[
                                        detailsStyles.statBar,
                                        {
                                            width: `${Math.min(stat.base_stat, 100)}%`,
                                            backgroundColor: backgroundColor
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={[detailsStyles.statNumber, { color: colors.text }]}>{stat.base_stat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Abilities */}
            <View style={[detailsStyles.infoCard, {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
                ...SHADOWS.medium
            }]}>
                <Text style={[detailsStyles.sectionTitle, { color: colors.text }]}>Abilities</Text>
                <View style={detailsStyles.abilitiesContainer}>
                    {pokemon.abilities?.map((ability: any, index: number) => (
                        <View key={index} style={[detailsStyles.abilityBadge, { backgroundColor: backgroundColor }]}>
                            <Text style={[detailsStyles.abilityText, { color: colors.background }]}>{ability.ability.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Moves Preview */}
            {pokemon.moves && pokemon.moves.length > 0 && (
                <View style={[detailsStyles.infoCard, {
                    backgroundColor: colors.background,
                    shadowColor: colors.shadow,
                    ...SHADOWS.medium
                }]}>
                    <Text style={[detailsStyles.sectionTitle, { color: colors.text }]}>Sample Moves ({pokemon.moves.length} total)</Text>
                    <View style={detailsStyles.movesContainer}>
                        {pokemon.moves.slice(0, 6).map((move: any, index: number) => (
                            <View key={index} style={[detailsStyles.moveBadge, {
                                backgroundColor: colors.surface,
                                borderColor: colors.border
                            }]}>
                                <Text style={[detailsStyles.moveText, { color: colors.text }]}>{move.move.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Sprites Gallery */}
            <View style={[detailsStyles.infoCard, {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
                ...SHADOWS.medium
            }]}>
                <Text style={[detailsStyles.sectionTitle, { color: colors.text }]}>Sprites Gallery</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={detailsStyles.spritesGrid}>
                    {pokemon.sprites?.front_default && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_default }} style={[detailsStyles.sprite, {
                                backgroundColor: colors.background,
                                borderColor: colors.border
                            }]} />
                            <Text style={[detailsStyles.spriteLabel, { color: colors.textSecondary }]}>Front</Text>
                        </View>
                    )}
                    {pokemon.sprites?.back_default && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_default }} style={[detailsStyles.sprite, {
                                backgroundColor: colors.background,
                                borderColor: colors.border
                            }]} />
                            <Text style={[detailsStyles.spriteLabel, { color: colors.textSecondary }]}>Back</Text>
                        </View>
                    )}
                    {pokemon.sprites?.front_shiny && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_shiny }} style={[detailsStyles.sprite, {
                                backgroundColor: colors.background,
                                borderColor: colors.border
                            }]} />
                            <Text style={[detailsStyles.spriteLabel, { color: colors.textSecondary }]}>Shiny</Text>
                        </View>
                    )}
                    {pokemon.sprites?.back_shiny && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_shiny }} style={[detailsStyles.sprite, {
                                backgroundColor: colors.background,
                                borderColor: colors.border
                            }]} />
                            <Text style={[detailsStyles.spriteLabel, { color: colors.textSecondary }]}>Shiny Back</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}
