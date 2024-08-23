import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { Pokemon } from '../../types/Pokemon';
import PokemonCard from "../pokemon-card/PokemonCard.tsx";
import PokemonFilter from "../pokemon-filter/PokemonFilter.tsx";
import {fetchPokemons, catchPokemon} from "../../api/api.ts";
import PaginationComponent from "../pagination/Pagination.tsx";
const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [page, setPage] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(12);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string[]>([]);
    const [experienceRange, setExperienceRange] = useState<number[]>([0, 1000]);
    const [showLegendaryOnly, setShowLegendaryOnly] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number | undefined>(0);
    const [sortOption, setSortOption] = useState<string>('');
    const [showCaughtOnly, setShowCaughtOnly] = useState(false);

    const handleFetchPokemons = async () => {
        try {
            const data = await fetchPokemons({
                limit: resultsPerPage,
                offset: page * resultsPerPage,
                name: search,
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
            console.error('Error fetching pokemons:', error);
        }
    };
    useEffect(() => {
        handleFetchPokemons();
    }, [page, resultsPerPage, showCaughtOnly, showLegendaryOnly, sortOption]);
    const handleCatchPokemon = async (pokemonId: any) => {
        try {
            await catchPokemon(pokemonId);
            setPokemons((prevPokemons) =>
                prevPokemons.map((pokemon) =>
                    pokemon.id === pokemonId ? { ...pokemon, isCaught: true } : pokemon
                )
            );
        } catch (err) {
            console.error('Error catching Pokémon:', err);
        }
    };
    const handleSearchClick = () => {
        setPage(0);
        handleFetchPokemons();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleExperienceRangeChange = (_event: ChangeEvent, newValue: number[]) => {
        setExperienceRange(newValue as number[]);
    };

    const handleShowCaughtOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowCaughtOnly(event.target.checked);
    };

    const handleShowLegendary = () => {
        setShowLegendaryOnly(!showLegendaryOnly);
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setResultsPerPage(parseInt(event.target.value as string, 10));
        setPage(0);
    };

    const handleSortOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortOption(event.target.value as 'name-asc' | 'name-desc' | 'experience-asc' | 'experience-desc');
        setPage(0);
    };
    const handleTypeFilterChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string;
        if (value.includes("")) {
            setTypeFilter([]);
        } else {
            // @ts-ignore
            setTypeFilter(value);
        }
    }
    console.log(page);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleFetchPokemons();
            setPage(0);
        }
    };
    return (
        <Container sx={{ minWidth: '100%', fontFamily: '"Roboto", sans-serif' }}>
            <Typography
                variant="h2"
                gutterBottom
                align="center"
                color="textPrimary"
                sx={{fontFamily: '"Pokemon Solid", sans-serif', paddingTop: "2rem", background: 'linear-gradient(135deg, #FFD700 0%, #FFB800 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Pokémon List
            </Typography>

            <Box  mb={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap="1rem" >
                <PokemonFilter
                    search={search}
                    onSearchChange={handleSearchChange}
                    onSearchClick={handleSearchClick}
                    showLegendaryOnly={showLegendaryOnly}
                    onShowLegendaryToggle={handleShowLegendary}
                    typeFilter={typeFilter}
                    onTypeFilterChange={handleTypeFilterChange}
                    sortOption={sortOption}
                    onSortOptionChange={handleSortOptionChange}
                    experienceRange={experienceRange}
                    onExperienceRangeChange={handleExperienceRangeChange}
                    showCaughtOnly={showCaughtOnly}
                    onShowCaughtOnlyChange={handleShowCaughtOnlyChange}
                    onKeyDown={handleKeyDown}
                />
            </Box>

            <Grid container spacing={4} >
                {pokemons.map((pokemon) => (
                    <Grid item md={2} key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} onCatch={handleCatchPokemon}/>
                    </Grid>

                ))}
            </Grid>
            <PaginationComponent
                totalCount={totalCount || 0}
                resultsPerPage={resultsPerPage}
                page={page}
                onChangePage={handleChangePage}
                // @ts-ignore
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Container>
    );
};

export default PokemonList;
