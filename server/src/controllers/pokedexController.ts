import { Request, Response } from 'express';
import {
    getPokemons,
    getPokemonById,
    catchPokemon,
    isPokemonCaught,
    getAllCaughtPokemons,
} from '../services/pokemonService';

export const getPokemonsController = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const offset = parseInt(req.query.offset as string, 10) || 0;
        const name = req.query.name as string;
        const minExperience = req.query.min_experience ? parseInt(req.query.min_experience as string, 10) : undefined;
        const maxExperience = req.query.max_experience ? parseInt(req.query.max_experience as string, 10) : undefined;
        const types = req.query.types ? (req.query.types as string) : undefined;
        const showLegendaryOnly = req.query.show_legendary_only as string;
        const sort = req.query.sort as string;
        const caughtOnly = req.query.show_caught_only as string;

        const data = await getPokemons(
            limit,
            offset,
            name,
            minExperience,
            maxExperience,
            types,
            showLegendaryOnly,
            sort,
            caughtOnly,
        );

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getPokemonByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await getPokemonById(id);
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const catchPokemonController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await catchPokemon(id);
        res.status(200).json({ message: `Caught Pokémon with ID #${id}` });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const isPokemonCaughtController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const caught = await isPokemonCaught(id);
        res.json({ caught });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllCaughtPokemonsController = async (req: Request, res: Response) => {
    try {
        const caughtPokemons = await getAllCaughtPokemons();
        res.json(caughtPokemons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
