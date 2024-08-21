"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPokemonCaught = exports.getAllCaughtPokemons = exports.catchPokemon = exports.getPokemonById = exports.getPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisClient_1 = __importDefault(require("../utils/redisClient"));
dotenv_1.default.config();
const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL;
const getPokemons = async (limit) => {
    try {
        const response = await axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
        return response.data;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.getPokemons = getPokemons;
const getPokemonById = async (id) => {
    try {
        const response = await axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        return response.data;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.getPokemonById = getPokemonById;
const catchPokemon = async (id) => {
    try {
        await redisClient_1.default.sadd('caughtPokemons', id);
        return { success: true };
    }
    catch (error) {
        console.error(`Error catching Pokémon #${id}:`, error);
        throw new Error(`Failed to catch Pokémon #${id}.`);
    }
};
exports.catchPokemon = catchPokemon;
const getAllCaughtPokemons = async () => {
    try {
        return redisClient_1.default.smembers('caughtPokemons');
    }
    catch (err) {
        console.error('Error getting all caught pokemons: ', err);
        throw new Error('Failed to get all caught pokemons');
    }
};
exports.getAllCaughtPokemons = getAllCaughtPokemons;
const isPokemonCaught = async (id) => {
    try {
        return Boolean(redisClient_1.default.sismember('caughtPokemons', id));
    }
    catch (err) {
        console.error(`Error checking if Pokemon with the id of ${id} was caught: `, err);
        throw new Error(`Failed to check the status of Pokemon with the id of ${id}`);
    }
};
exports.isPokemonCaught = isPokemonCaught;
