import express from "express";
import {
    getPokemons,
    getPokemonById,
    catchPokemon,
    isPokemonCaught,
    getAllCaughtPokemons,
} from "../controllers/pokedexController";

const router = express.Router();

router.get("/pokemons", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const name = req.query.name as string;
        const minExperience = parseInt(req.query.min_experience as string) || undefined;
        const maxExperience = parseInt(req.query.max_experience as string) || undefined;
        const showLegendaryOnly = req.query.show_legendary_only as string;
        const types = req.query.types as string[];
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

        res.json({
            pokemons: data.pokemons,
            totalCount: data.totalCount,
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// get gokemon by id
router.get("/pokemon/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getPokemonById(id);
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// catch pokemon by id
router.post("/pokemon/:id/catch", async (req, res) => {
    const { id } = req.params;
    try {
        await catchPokemon(id);
        res.status(200).json({ message: `Caught pokemon with the ID #${id}` });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// check if pokemon was caught by its id
router.get("/pokemon/:id/caught", async (req, res) => {
    const { id } = req.params;
    try {
        const caught = await isPokemonCaught(id);
        res.json({ caught });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// get all caught pokemons
router.get("/pokemons/caught", async (req, res) => {
    try {
        const caughtPokemons = await getAllCaughtPokemons();
        res.json(caughtPokemons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
