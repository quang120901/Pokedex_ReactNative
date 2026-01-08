import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../utils/ThemeContext";
import ErrorState from "./components/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner";
import PokemonCard from "./components/PokemonCard";
import pokemonService from "./services/pokemonService";
import { globalStyles } from "./styles/components/globalStyles";
import { indexStyles } from "./styles/components/indexStyles";
import { searchStyles } from "./styles/components/searchStyles";
import { SPACING } from "./styles/spacing";

export default function Index() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { theme, toggleTheme, colors } = useTheme();
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

  const handleSearch = useCallback(async () => {
    const query = searchQuery.trim();
    if (!query || query.length < 2) {
      return;
    }

    setSearchLoading(true);
    setError(null);

    try {
      const results = await pokemonService.searchPokemonByName(query);
      if (results && results.length > 0) {
        setSearchResults(results);
        setError(null);
      } else {
        setSearchResults([]);
        setError("No Pokemon found");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Search failed";
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  // Real-time search effect
  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length === 0) {
      setIsSearching(false);
      setSearchResults([]);
      setError(null);
      return;
    }

    // Only search if at least 2 characters are typed
    if (query.length < 2) {
      setIsSearching(true);
      setSearchResults([]);
      setError(null);
      return;
    }

    // Set searching state and debounce the search
    setIsSearching(true);
    const searchTimeout = setTimeout(() => {
      handleSearch();
    }, 300); // 300ms delay

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, handleSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
    setError(null);
  }, []);

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={[indexStyles.scrollContainer, { paddingTop: SPACING.lg + (StatusBar.currentHeight || 0), paddingBottom: 100 }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ backgroundColor: colors.background }}
      >
        {/* Theme Toggle Button */}
        <View style={[indexStyles.header, {
          backgroundColor: colors.primary,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4
        }]}>
          <View style={[globalStyles.row, globalStyles.between, { width: '100%' }]}>
            <Text style={indexStyles.headerTitle}>Pokédex</Text>
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                backgroundColor: theme === 'light' ? colors.background : colors.surface,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: colors.background,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {theme === 'light' ? '🌙' : '☀️'}
              </Text>
              <Text style={{
                color: theme === 'light' ? colors.text : colors.textSecondary,
                fontWeight: '600',
                fontSize: 12,
                textTransform: 'uppercase'
              }}>
                {theme === 'light' ? 'Dark' : 'Light'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={indexStyles.headerSubtitle}>
            {isSearching && searchQuery.trim().length >= 2
              ? `Found ${searchResults.length} Pokemon${searchResults.length !== 1 ? 's' : ''}`
              : `Discover ${pokemons.length}+ Pokemons`
            }
          </Text>
        </View>

        {/* Search Results or Pokemon Grid */}
        {isSearching && searchQuery.trim().length >= 2 ? (
          <View style={indexStyles.grid}>
            {searchLoading ? (
              <View style={indexStyles.loadingMoreContainer}>
                <LoadingSpinner message="Searching..." />
              </View>
            ) : searchResults.length > 0 ? (
              <View style={indexStyles.grid}>
                {searchResults.reduce((rows: any[][], pokemon, index) => {
                  const rowIndex = Math.floor(index / 2);
                  if (!rows[rowIndex]) rows[rowIndex] = [];
                  rows[rowIndex].push(
                    <View key={pokemon.id} style={indexStyles.cardWrapper}>
                      <PokemonCard pokemon={pokemon} />
                    </View>
                  );
                  return rows;
                }, []).map((row: any[], rowIndex: number) => (
                  <View key={`search-row-${rowIndex}`} style={indexStyles.row}>
                    {row}
                  </View>
                ))}
              </View>
            ) : (
              <View style={globalStyles.emptyContainer}>
                <Text style={indexStyles.emptyText}>No Pokemon found</Text>
              </View>
            )}
          </View>
        ) : (
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
        )}

        {loadingMore && !isSearching && (
          <View style={indexStyles.loadingMoreContainer}>
            <LoadingSpinner message="Loading more Pokemons..." />
          </View>
        )}

        {!hasMore && pokemons.length > 0 && !isSearching && (
          <View style={indexStyles.endMessage}>
            <Text style={indexStyles.endText}>You've reached the end!</Text>
          </View>
        )}
      </ScrollView>

      {/* Search Bar at Bottom - Modern Aero Design */}
      <View style={[searchStyles.container, {
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(20, 20, 20, 0.98)',
        shadowColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      }]}>
        <View style={[searchStyles.inputContainer, {
          backgroundColor: theme === 'light' ? 'rgba(248, 249, 250, 0.9)' : 'rgba(40, 40, 40, 0.9)',
          borderColor: theme === 'light' ? 'rgba(222, 226, 230, 0.6)' : 'rgba(51, 51, 51, 0.6)',
          shadowColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3)',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }]}>
          <TextInput
            style={[searchStyles.input, {
              backgroundColor: 'transparent',
              color: colors.text,
              textAlignVertical: 'center',
            }]}
            placeholder="Type to search Pokemon..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              activeOpacity={0.7}
              style={[searchStyles.button, {
                backgroundColor: theme === 'light' ? 'rgba(108, 117, 125, 0.9)' : 'rgba(160, 160, 160, 0.9)',
                shadowColor: theme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.5)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 4,
                borderWidth: 1,
                borderColor: theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
              }]}
            >
              <Text style={[searchStyles.buttonText, {
                color: theme === 'light' ? 'white' : 'black',
                fontWeight: '700',
                fontSize: 12,
                letterSpacing: 0.5,
              }]}>Clear</Text>
            </TouchableOpacity>
          )}
          {searchLoading && (
            <View style={{
              paddingHorizontal: SPACING.sm,
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 40,
            }}>
              <Text style={{
                color: colors.primary,
                fontWeight: '800',
                fontSize: 14,
                letterSpacing: 1,
              }}>...</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}