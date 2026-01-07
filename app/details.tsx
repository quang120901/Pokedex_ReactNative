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
import ErrorState from "./components/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner";
import pokemonService from "./services/pokemonService";
import theme from "./styles/theme";

const { COLORS, detailsStyles, SPACING } = theme;

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

    const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
    const backgroundColor = COLORS[primaryType as keyof typeof COLORS] || COLORS.normal;
    const cardBackgroundColor = backgroundColor + '40';

    const toggleImage = () => {
        setShowBackImage(prev => !prev);
    };

    return (
        <ScrollView contentContainerStyle={[detailsStyles.scrollContainer, { paddingTop: SPACING.lg + (StatusBar.currentHeight || 0) }]}>
            {/* Header */}
            <View style={[detailsStyles.header, { backgroundColor: cardBackgroundColor }]}>
                <TouchableOpacity onPress={() => router.back()} style={detailsStyles.backButton}>
                    <Text style={detailsStyles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={detailsStyles.pokemonName}>{pokemon.name || 'Unknown'}</Text>
                <Text style={detailsStyles.pokemonId}>#{pokemon.id?.toString().padStart(3, '0') || '000'}</Text>
            </View>

            {/* Main Image */}
            <TouchableOpacity onPress={toggleImage} style={detailsStyles.imageContainer}>
                {pokemon.sprites?.front_default && (
                    <Image
                        source={{ uri: showBackImage ? (pokemon.sprites.back_default || pokemon.sprites.front_default) : pokemon.sprites.front_default }}
                        style={[detailsStyles.mainImage, { width: width * 0.6, height: width * 0.6 }]}
                        resizeMode="contain"
                    />
                )}
                <Text style={detailsStyles.imageHint}>Tap to flip</Text>
            </TouchableOpacity>

            {/* Types */}
            <View style={detailsStyles.typesContainer}>
                {pokemon.types?.map((type: any, index: number) => (
                    <View key={index} style={[detailsStyles.typeBadge, { backgroundColor: COLORS[type.type.name as keyof typeof COLORS] || COLORS.normal }]}>
                        <Text style={detailsStyles.typeText}>{type.type.name}</Text>
                    </View>
                ))}
            </View>

            {/* Basic Info */}
            <View style={detailsStyles.infoCard}>
                <Text style={detailsStyles.sectionTitle}>Basic Info</Text>
                <View style={detailsStyles.statsGrid}>
                    <View style={detailsStyles.statItem}>
                        <Text style={detailsStyles.statLabel}>Height</Text>
                        <Text style={detailsStyles.statValue}>{pokemon.height ? (pokemon.height / 10).toFixed(1) : '0.0'} m</Text>
                    </View>
                    <View style={detailsStyles.statItem}>
                        <Text style={detailsStyles.statLabel}>Weight</Text>
                        <Text style={detailsStyles.statValue}>{pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '0.0'} kg</Text>
                    </View>
                    <View style={detailsStyles.statItem}>
                        <Text style={detailsStyles.statLabel}>Base Exp</Text>
                        <Text style={detailsStyles.statValue}>{pokemon.base_experience || '0'}</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={detailsStyles.infoCard}>
                <Text style={detailsStyles.sectionTitle}>Stats</Text>
                <View style={detailsStyles.statsList}>
                    {pokemon.stats?.map((stat: any, index: number) => (
                        <View key={index} style={detailsStyles.statRow}>
                            <Text style={detailsStyles.statName}>{stat.stat.name}</Text>
                            <View style={detailsStyles.statBarContainer}>
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
                            <Text style={detailsStyles.statNumber}>{stat.base_stat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Abilities */}
            <View style={detailsStyles.infoCard}>
                <Text style={detailsStyles.sectionTitle}>Abilities</Text>
                <View style={detailsStyles.abilitiesContainer}>
                    {pokemon.abilities?.map((ability: any, index: number) => (
                        <View key={index} style={detailsStyles.abilityBadge}>
                            <Text style={detailsStyles.abilityText}>{ability.ability.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Moves Preview */}
            {pokemon.moves && pokemon.moves.length > 0 && (
                <View style={detailsStyles.infoCard}>
                    <Text style={detailsStyles.sectionTitle}>Sample Moves ({pokemon.moves.length} total)</Text>
                    <View style={detailsStyles.movesContainer}>
                        {pokemon.moves.slice(0, 6).map((move: any, index: number) => (
                            <View key={index} style={detailsStyles.moveBadge}>
                                <Text style={detailsStyles.moveText}>{move.move.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Sprites Gallery */}
            <View style={detailsStyles.infoCard}>
                <Text style={detailsStyles.sectionTitle}>Sprites Gallery</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={detailsStyles.spritesGrid}>
                    {pokemon.sprites?.front_default && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_default }} style={detailsStyles.sprite} />
                            <Text style={detailsStyles.spriteLabel}>Front</Text>
                        </View>
                    )}
                    {pokemon.sprites?.back_default && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_default }} style={detailsStyles.sprite} />
                            <Text style={detailsStyles.spriteLabel}>Back</Text>
                        </View>
                    )}
                    {pokemon.sprites?.front_shiny && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.front_shiny }} style={detailsStyles.sprite} />
                            <Text style={detailsStyles.spriteLabel}>Shiny</Text>
                        </View>
                    )}
                    {pokemon.sprites?.back_shiny && (
                        <View style={detailsStyles.spriteWrapper}>
                            <Image source={{ uri: pokemon.sprites.back_shiny }} style={detailsStyles.sprite} />
                            <Text style={detailsStyles.spriteLabel}>Shiny Back</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}
