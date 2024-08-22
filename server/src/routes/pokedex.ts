import express from "express";
import { getPokemons, getPokemonById, catchPokemon, isPokemonCaught, getAllCaughtPokemons } from "../controllers/pokedexController";
import redisClient from "../utils/redisClient";

const router = express.Router();

router.get("/pokemons", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const name = req.query.name as string;
        const minExperience = parseInt(req.query.minExperience as string);
        const maxExperience = parseInt(req.query.maxExperience as string);
        const type = req.query.type as string;

        const data = await getPokemons(limit, offset, name, minExperience, maxExperience, type);
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getPokemonById(id);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/pokemon/:id/catch", async (req, res) => {
    const { id } = req.params;
    try {
        await catchPokemon(id);
        res.status(200).json({ message: `caught pokemon with the id #${id} ` });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/pokemon/:id/caught", async (req, res) => {
    const { id } = req.params;
    try {
        const caught = await isPokemonCaught(id);
        res.json({ caught });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/pokemons/caught", async (req, res) => {
    try {
        const caughtPokemons = await getAllCaughtPokemons();
        res.json(caughtPokemons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/redis-test", async (req, res) => {
    try {
        await redisClient.set("test-key1", "test-value");
        const value = await redisClient.get("test-key1");
        res.json({ "test-key": value });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
