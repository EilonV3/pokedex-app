import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL;

export const fetchPokemonData = async () => {
    return await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=900&offset=0`);
};

export const fetchPokemonById = async (id: string) => {
    return await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
};

export const fetchPokemonSpeciesById = async (id: number) => {
    return await axios.get(`${POKEAPI_BASE_URL}/pokemon-species/${id}/`);
};
