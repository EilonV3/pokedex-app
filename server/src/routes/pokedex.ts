import express from 'express';
import {
    getPokemonsController,
    getPokemonByIdController,
    catchPokemonController,
    isPokemonCaughtController,
    getAllCaughtPokemonsController,
} from '../controllers/pokedexController';

const router = express.Router();

router.get('/pokemons', getPokemonsController);
router.get('/pokemon/:id', getPokemonByIdController);
router.post('/pokemon/:id/catch', catchPokemonController);
router.get('/pokemon/:id/caught', isPokemonCaughtController);
router.get('/pokemons/caught', getAllCaughtPokemonsController);

export default router;
