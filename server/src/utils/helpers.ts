import redisClient from "../services/redisClient";

export const filterByName = (pokemons: any[], name?: string) => {
    if (name) {
        return pokemons.filter(pokemon => pokemon.name.includes(name));
    }
    return pokemons;
};

export const filterByLegendaryStatus = (pokemons: any[], showLegendaryOnly?: string) => {
    if (showLegendaryOnly === "true") {
        return pokemons.filter(pokemon => pokemon.isLegendary);
    }
    return pokemons;
};

export const filterByExperience = (pokemons: any[], minExperience?: number, maxExperience?: number) => {
    if (minExperience !== undefined) {
        pokemons = pokemons.filter(pokemon => pokemon.base_experience >= minExperience);
    }
    if (maxExperience !== undefined) {
        pokemons = pokemons.filter(pokemon => pokemon.base_experience <= maxExperience);
    }
    return pokemons;
};

export const filterByCaughtStatus = async (pokemons: any[], caughtOnly?: string) => {
    if (caughtOnly === 'true') {
        const caughtPokemonsIds = await redisClient.smembers('caughtPokemons');
        return pokemons.filter(pokemon => caughtPokemonsIds.includes(pokemon.id.toString()));
    }
    return pokemons;
};

export const filterByTypes = (pokemons: any[], types?: string[]) => {
    if (types && types.length > 0) {
        return pokemons.filter(pokemon =>
            pokemon.types.some((type: string) => types.includes(type))
        );
    }
    return pokemons;
};

export const sortPokemons = (pokemons: any[], sort?: string) => {
    if (sort) {
        switch (sort) {
            case "name-asc":
                pokemons.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                pokemons.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "experience-asc":
                pokemons.sort((a, b) => a.base_experience - b.base_experience);
                break;
            case "experience-desc":
                pokemons.sort((a, b) => b.base_experience - a.base_experience);
                break;
            default:
                break;
        }
    }
    return pokemons;
};

export const markCaughtPokemons = async (pokemons: any[]) => {
    const caughtPokemonsIds = await redisClient.smembers('caughtPokemons');
    return pokemons.map(pokemon => ({
        ...pokemon,
        isCaught: caughtPokemonsIds.includes(pokemon.id.toString()),
    }));
};

export const paginatePokemons = (pokemons: any[], limit: number, offset: number) => {
    return pokemons.slice(offset, offset + limit);
};

export const getTotalCount = (pokemons: any[]) => {
    return pokemons.length;
};
