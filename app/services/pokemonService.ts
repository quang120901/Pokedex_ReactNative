import PokemonTypes from '../types/pokemon';

const { PokemonCard, PokemonDetails, PokemonListResponse } = PokemonTypes;

const BASE_URL = 'https://pokeapi.co/api/v2';

const pokemonService = {
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
   * Search for pokemon by name (supports partial matches)
   */
  async searchPokemonByName(name: string): Promise<any[] | null> {
    if (!name || name.trim() === '') {
      return null;
    }
    
    const searchTerm = name.toLowerCase().trim();
    
    try {
      // First try exact match
      const exactResponse = await fetch(`${BASE_URL}/pokemon/${searchTerm}`);
      if (exactResponse.ok) {
        const data: any = await exactResponse.json();
        return [{
          name: data.name,
          image: data.sprites.front_default,
          imageBack: data.sprites.back_default,
          types: data.types,
          id: data.id,
        }];
      }
      
      // If no exact match, search through all Pokemon for partial matches
      // Fetch a larger list to search through
      const listResponse = await fetch(`${BASE_URL}/pokemon/?limit=200`);
      if (!listResponse.ok) {
        throw new Error(`HTTP error! status: ${listResponse.status}`);
      }
      
      const listData: any = await listResponse.json();
      const filteredResults = listData.results.filter((pokemon: any) =>
        pokemon.name.includes(searchTerm)
      );
      
      if (filteredResults.length === 0) {
        return [];
      }
      
      // Get details for filtered Pokemon (limit to first 6 for performance)
      const detailedPokemons = await Promise.all(
        filteredResults.slice(0, 6).map(async (pokemon: any) => {
          return await this.getPokemonDetailsByName(pokemon.name);
        })
      );
      
      return detailedPokemons.filter((p): p is any => p !== null);
    } catch (error) {
      console.error(`Error searching for pokemon ${name}:`, error);
      return [];
    }
  }
};

export default pokemonService;
