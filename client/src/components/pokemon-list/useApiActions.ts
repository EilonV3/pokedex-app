import { fetchPokemons, catchPokemon } from "../../api/api.ts";
import { Pokemon } from "../../types/Pokemon.ts";

interface UseApiActionsParams {
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  resultsPerPage: number;
  page: number;
  search: string;
  typeFilter: string[];
  experienceRange: number[];
  showLegendaryOnly: boolean;
  sortOption: string;
  showCaughtOnly: boolean;
}
const usePokemonActions = ({
  setPokemons,
  setTotalCount,
  resultsPerPage,
  page,
  search,
  typeFilter,
  experienceRange,
  showLegendaryOnly,
  sortOption,
  showCaughtOnly,
}: UseApiActionsParams) => {
  const handleFetchPokemons = async () => {
    try {
      const data = await fetchPokemons({
        limit: resultsPerPage,
        offset: page * resultsPerPage,
        name: search.toLowerCase(),
        types: typeFilter,
        min_experience: experienceRange[0],
        max_experience: experienceRange[1],
        show_legendary_only: showLegendaryOnly,
        sort: sortOption,
        show_caught_only: showCaughtOnly,
      });
      setPokemons(data.pokemons);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  const handleCatchPokemon = async (pokemonId: any) => {
    try {
      await catchPokemon(pokemonId);
      setPokemons((prevPokemons) =>
        prevPokemons.map((pokemon) =>
          pokemon.id === pokemonId ? { ...pokemon, isCaught: true } : pokemon,
        ),
      );
    } catch (err) {
      console.error("Error catching Pokémon:", err);
    }
  };

  return {
    handleFetchPokemons,
    handleCatchPokemon,
  };
};

export default usePokemonActions;
