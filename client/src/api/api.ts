import axios from 'axios';

export interface FetchPokemonsParams {
    limit: number;
    offset: number;
    name?: string;
    types?: string[];
    min_experience?: number;
    max_experience?: number;
    show_legendary_only?: boolean;
    sort?: string;
    show_caught_only?: boolean;
}

export const fetchPokemons = async (params: FetchPokemonsParams) => {
    try {
        const response = await axios.get('/api/pokemons', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
};

export const catchPokemon = async (pokemonId: number) => {
    try {
        await axios.post(`/api/pokemon/${pokemonId}/catch`);
    } catch (error) {
        console.error('Error catching Pokémon:', error);
        throw error;
    }
};