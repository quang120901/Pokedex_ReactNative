import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";
import ErrorState from "./components/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner";
import PokemonCard from "./components/PokemonCard";
import pokemonService from "./services/pokemonService";
import theme from "./styles/theme";

const { COLORS, globalStyles, indexStyles, SPACING, TYPOGRAPHY } = theme;

export default function Index() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 12;

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getPokemons(LIMIT, 0);
      setPokemons(data);
      setOffset(LIMIT);
      setHasMore(data.length === LIMIT);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to fetch pokemons";
      setError(errorMessage);
      console.error("Error fetching pokemons:", e);
    } finally {
      setLoading(false);
    }
  }

  const loadMorePokemons = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const data = await pokemonService.getPokemons(LIMIT, offset);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPokemons(prev => [...prev, ...data]);
        setOffset(prev => prev + LIMIT);
        setHasMore(data.length === LIMIT);
      }
    } catch (e) {
      console.error("Error loading more pokemons:", e);
      // Silently fail for load more - user can scroll again to retry
    } finally {
      setLoadingMore(false);
    }
  }, [offset, hasMore, loadingMore]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setOffset(0);
      setHasMore(true);
      const data = await pokemonService.getPokemons(LIMIT, 0);
      setPokemons(data);
      setOffset(LIMIT);
      setHasMore(data.length === LIMIT);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to refresh pokemons";
      setError(errorMessage);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;

    if (isNearBottom && !loadingMore && hasMore) {
      loadMorePokemons();
    }
  }, [loadingMore, hasMore, loadMorePokemons]);

  if (loading) {
    return <LoadingSpinner message="Loading Pokemons..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchPokemons} />;
  }

  if (pokemons.length === 0) {
    return (
      <View style={globalStyles.emptyContainer}>
        <Text style={indexStyles.emptyText}>No Pokemons found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[indexStyles.scrollContainer, { paddingTop: SPACING.lg + (StatusBar.currentHeight || 0) }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={indexStyles.header}>
        <Text style={indexStyles.headerTitle}>Pokédex</Text>
        <Text style={indexStyles.headerSubtitle}>Discover {pokemons.length}+ Pokemons</Text>
      </View>

      <View style={indexStyles.grid}>
        {pokemons.reduce((rows: any[][], pokemon, index) => {
          const rowIndex = Math.floor(index / 2);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(
            <View key={pokemon.id} style={indexStyles.cardWrapper}>
              <PokemonCard pokemon={pokemon} />
            </View>
          );
          return rows;
        }, []).map((row: any[], rowIndex: number) => (
          <View key={`row-${rowIndex}`} style={indexStyles.row}>
            {row}
          </View>
        ))}
      </View>

      {loadingMore && (
        <View style={indexStyles.loadingMoreContainer}>
          <LoadingSpinner message="Loading more Pokemons..." />
        </View>
      )}

      {!hasMore && pokemons.length > 0 && (
        <View style={indexStyles.endMessage}>
          <Text style={indexStyles.endText}>You've reached the end!</Text>
        </View>
      )}
    </ScrollView>
  );
}