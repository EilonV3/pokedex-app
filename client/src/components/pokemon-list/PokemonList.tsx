import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    Slider,
    Pagination
} from '@mui/material';
import axios from 'axios';
import { Pokemon } from '../../types/Pokemon';

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [page, setPage] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string[]>([]);
    const [experienceRange, setExperienceRange] = useState<number[]>([0, 1000]);
    const [showLegendaryOnly, setShowLegendaryOnly] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
    const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'experience-asc' | 'experience-desc'>();

    useEffect(() => {
        fetchPokemons();
    }, [page, resultsPerPage]);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get(`/api/pokemons`, {
                params: {
                    limit: resultsPerPage,
                    offset: page * resultsPerPage,
                    name: search,
                    types: typeFilter,
                    min_experience: experienceRange[0],
                    max_experience: experienceRange[1],
                    show_legendary_only: showLegendaryOnly,
                    sort: sortOption,
                },
            });
            setPokemons(response.data.pokemons);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
    };

    const handleSearchClick = () => {
        setPage(0);
        fetchPokemons();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // const handleTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setTypeFilter(event.target.value as string[]);
    //     setPage(0);
    // };

    const handleExperienceRangeChange = (event: Event, newValue: number | number[]) => {
        setExperienceRange(newValue as number[]);
    };

    const handleShowLegendary = () => setShowLegendaryOnly(!showLegendaryOnly);

    const handleChangePage = (event: unknown, newPage: number) => {
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

    return (
        <Container sx={{ minWidth: '100%', fontFamily: '"Roboto", sans-serif' }}>
            <Typography
                variant="h2"
                gutterBottom
                align="center"
                sx={{ color: '#ffcb05', fontFamily: '"Pokemon Solid", sans-serif', paddingTop: "2rem" }}
            >
                Pokémon List
            </Typography>

            <Box  mb={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap="1rem" >
                <TextField
                    sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "4rem" }}
                    label="Search Pokémon"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button
                    sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "3.5rem" }}
                    variant="outlined"
                    onClick={handleShowLegendary}
                >
                    {showLegendaryOnly ? 'Show All' : 'Show Legendary'}
                </Button>
                <FormControl sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "4rem" }} variant="outlined">
                    <InputLabel>Type</InputLabel>
                    <Select
                        multiple
                        value={typeFilter}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (value.includes("")) {
                                setTypeFilter([]);
                            } else {
                                // @ts-ignore
                                setTypeFilter(value);
                            }
                        }}
                        label="Type"
                    >
                        <MenuItem value="">Clear All</MenuItem>
                        <MenuItem value="grass">Grass</MenuItem>
                        <MenuItem value="fire">Fire</MenuItem>
                        <MenuItem value="water">Water</MenuItem>
                        <MenuItem value="electric">Electric</MenuItem>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="poison">Poison</MenuItem>
                        <MenuItem value="flying">Flying</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortOption}
                        // @ts-ignore
                        onChange={handleSortOptionChange}
                        label="Sort By"
                    >
                        <MenuItem value="name-asc">Name Ascending</MenuItem>
                        <MenuItem value="name-desc">Name Descending</MenuItem>
                        <MenuItem value="experience-asc">Experience Ascending</MenuItem>
                        <MenuItem value="experience-desc">Experience Descending</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{maxWidth: '80%'}}>
                    <Typography gutterBottom>Experience Range</Typography>
                    <Slider
                        value={experienceRange}
                        onChange={handleExperienceRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        step={10}
                        aria-labelledby="experience-range-slider"
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "3.5rem" }}
                    onClick={handleSearchClick}
                >
                    Search
                </Button>
            </Box>

            <Grid container spacing={4} >
                {pokemons.map((pokemon) => (
                    <Grid item md={2} key={pokemon.id}>
                        <Card
                            sx={{
                                width: '14rem',
                                height: '100%',
                                maxHeight: '22rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: pokemon.isLegendary ? '4px solid gold' : '4px solid transparent',
                                boxShadow: pokemon.isLegendary
                                    ? '0 0 10px 5px rgba(255, 215, 0, 0.5)'
                                    : '',
                                animation: pokemon.isLegendary
                                    ? 'glow 0.8s infinite alternate'
                                    : 'none',
                                '@keyframes glow': {
                                    '0%': { boxShadow: '0 0 5px gold' },
                                    '100%': { boxShadow: '1px 1px 16px gold' },
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    height: '120px',
                                    objectFit: 'contain',
                                    padding: '8px',
                                }}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                alt={pokemon.name}
                            />
                            <CardContent sx={{ padding: '8px', textAlign: 'center' }}>
                                <Typography variant="h6">{pokemon.name}</Typography>
                                <Typography color="textSecondary">
                                    Base Experience: {pokemon.base_experience}
                                </Typography>
                                <Typography color="textSecondary">
                                    Types: {pokemon.types.join(', ')}
                                </Typography>
                                {pokemon.isLegendary && (
                                    <Typography color="textPrimary">Legendary!!</Typography>
                                )}
                            </CardContent>
                            <Box p={1} display="flex" justifyContent="center">
                                <Button variant="contained" color="primary">
                                    Catch Pokémon
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(totalCount! / resultsPerPage)}
                    page={page + 1}
                    onChange={handleChangePage}
                    color="primary"
                    shape="rounded"
                    sx={{ margin: "1rem" }}
                />
                <FormControl sx={{ width: "8rem", height: "4rem", textAlign: "center" }} variant="outlined">
                    <InputLabel>Results per page</InputLabel>
                    <Select
                        value={resultsPerPage.toString()}
                        // @ts-ignore
                        onChange={handleRowsPerPageChange}
                        label="Results per page"
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PokemonList;
