export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny?: string;
  back_shiny?: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonCard {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
  id: number;
}

// Default export for types file (exports all interfaces as a single object)
const PokemonTypes = {
  PokemonType: {} as PokemonType,
  PokemonStat: {} as PokemonStat,
  PokemonAbility: {} as PokemonAbility,
  PokemonMove: {} as PokemonMove,
  PokemonSprites: {} as PokemonSprites,
  PokemonDetails: {} as PokemonDetails,
  PokemonListResponse: {} as PokemonListResponse,
  PokemonCard: {} as PokemonCard,
};

export default PokemonTypes;