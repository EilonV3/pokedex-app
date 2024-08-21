"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokedexController_1 = require("../controllers/pokedexController");
const router = express_1.default.Router();
router.get("/pokemons", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const data = await (0, pokedexController_1.getPokemons)(limit);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/pokemon/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await (0, pokedexController_1.getPokemonById)(id);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/pokemon/:id/catch", async (req, res) => {
    const { id } = req.params;
    try {
        await (0, pokedexController_1.catchPokemon)(id);
        res.status(200).json({ message: `caught pokemon with the id #${id} ` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/pokemon/:id/caught", async (req, res) => {
    const { id } = req.params;
    try {
        const caught = await (0, pokedexController_1.isPokemonCaught)(id);
        res.json({ caught });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/pokemons/caught", async (req, res) => {
    try {
        const caughtPokemons = await (0, pokedexController_1.getAllCaughtPokemons)();
        res.json(caughtPokemons);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// router.get("/redis-test", async (req, res) => {
//     try {
//         await redisClient.set("test-key", "test-value");
//         const value = await redisClient.get("test-key");
//         res.json({ "test-key": value });
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// });
exports.default = router;
