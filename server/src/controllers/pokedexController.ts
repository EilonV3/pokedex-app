import axios from "axios";
import dotenv from "dotenv";
import redisClient from "../services/redisClient";
import {
    filterByName,
    filterByLegendaryStatus,
    filterByExperience,
    filterByCaughtStatus,
    filterByTypes,
    sortPokemons,
    paginatePokemons,
    getTotalCount,
    markCaughtPokemons,
} from "../utils/helpers";

dotenv.config();
const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL;

interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    types: string[];
    isLegendary?: boolean;
    isCaught?: boolean;
}
const isPokemonLegendary = async (id: number) => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon-species/${id}/`);
    return response.data.is_legendary;
};
export const getPokemons = async (limit: number, offset: number, name?: string, minExperience?: number, maxExperience?: number, types?: string[], showLegendaryOnly?: string, sort?: string, caughtOnly?: string) => {
    try {
        let pokemons: Pokemon[];
        const cachedPokemons = await redisClient.get("pokemons");
        if (cachedPokemons) {
            pokemons = JSON.parse(cachedPokemons);
        } else {
            const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=500&offset=0`);
            const results = response.data.results;
            const detailedPokemons = await Promise.all(results.map(async (pokemon: any) => {
                const pokemonData = await axios.get(pokemon.url);
                const isLegendary = await isPokemonLegendary(pokemonData.data.id);
                return {
                    id: pokemonData.data.id,
                    name: pokemonData.data.name,
                    base_experience: pokemonData.data.base_experience,
                    types: pokemonData.data.types.map((t: any) => t.type.name),
                    isLegendary,
                };
            }));
            await redisClient.set("pokemons", JSON.stringify(detailedPokemons));
            pokemons = detailedPokemons;
        }

        pokemons = filterByName(pokemons, name);
        pokemons = filterByLegendaryStatus(pokemons, showLegendaryOnly);
        pokemons = filterByExperience(pokemons, minExperience, maxExperience);
        pokemons = await filterByCaughtStatus(pokemons, caughtOnly);
        pokemons = filterByTypes(pokemons, types);
        pokemons = sortPokemons(pokemons, sort);
        pokemons = await markCaughtPokemons(pokemons);
        const paginatedPokemons = paginatePokemons(pokemons, limit, offset);
        const totalCount = getTotalCount(pokemons);

        return { pokemons: paginatedPokemons, totalCount };
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const getPokemonById = async (id: string) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        return response.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const catchPokemon = async (id: string) => {
    try {
        await redisClient.sadd('caughtPokemons', id);
        return { success: true };
    } catch (error) {
        console.error(`Error catching Pokémon #${id}:`, error);
        throw new Error(`Failed to catch Pokémon #${id}.`);
    }
};

export const getAllCaughtPokemons = async () => {
    try {
        return redisClient.smembers('caughtPokemons');
    } catch (err) {
        console.error('Error getting all caught pokemons: ', err);
        throw new Error('Failed to get all caught pokemons');
    }
};

export const isPokemonCaught = async (id: string) => {
    try {
        const isCaught = await redisClient.sismember('caughtPokemons', id);
        return Boolean(isCaught);
    } catch (err) {
        console.error(`Error checking if Pokemon with the id of ${id} was caught: `, err);
        throw new Error(`Failed to check the status of Pokemon with the id of ${id}`);
    }
};
