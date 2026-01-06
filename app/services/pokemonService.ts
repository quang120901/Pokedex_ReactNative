import PokemonTypes from '../types/pokemon';

const { PokemonCard, PokemonDetails, PokemonListResponse } = PokemonTypes;

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  /**
   * Fetches a list of pokemons with pagination
   */
  async getPokemons(limit: number = 20, offset: number = 0): Promise<any[]> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any = await response.json();
      
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          return await this.getPokemonDetailsByName(pokemon.name);
        })
      );
      
      return detailedPokemons.filter((p): p is any => p !== null);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  },

  /**
   * Fetches detailed information for a single pokemon by name
   */
  async getPokemonDetailsByName(name: string): Promise<any | null> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any = await response.json();
      
      return {
        name: data.name,
        image: data.sprites.front_default,
        imageBack: data.sprites.back_default,
        types: data.types,
        id: data.id,
      };
    } catch (error) {
      console.error(`Error fetching pokemon ${name}:`, error);
      return null;
    }
  },

  /**
   * Fetches complete details for a single pokemon by ID or name
   */
  async getPokemonFullDetails(idOrName: string | number): Promise<any | null> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching full details for ${idOrName}:`, error);
      return null;
    }
  },

  /**
   * Searches for pokemons by name
   */
  async searchPokemons(query: string): Promise<any[]> {
    try {
      const pokemon = await this.getPokemonDetailsByName(query);
      return pokemon ? [pokemon] : [];
    } catch (error) {
      console.error('Error searching pokemons:', error);
      return [];
    }
  }
};

export default pokemonService;