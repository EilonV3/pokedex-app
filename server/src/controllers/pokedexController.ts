import axios from "axios";
import dotenv from "dotenv";
import redisClient from "../utils/redisClient";

dotenv.config();
const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL;

export const getPokemons = async (limit: number) => {
  try {
    const response = await axios.get(
      `${POKEAPI_BASE_URL}/pokemon?limit=${limit}`,
    );
    return response.data;
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
}
export const isPokemonCaught = async (id: string) => {
    try {
        const isCaught = await redisClient.sismember('caughtPokemons', id)
        return Boolean(isCaught);
    } catch (err) {
        console.error(`Error checking if Pokemon with the id of ${id} was caught: `, err);
        throw new Error(`Failed to check the status of Pokemon with the id of ${id}`);
    }
}
