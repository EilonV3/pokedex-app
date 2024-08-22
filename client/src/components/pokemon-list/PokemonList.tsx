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
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string[]>([]);
    const [experienceRange, setExperienceRange] = useState<number[]>([0, 1000]);
    const [showLegendaryOnly, setShowLegendaryOnly] = useState<boolean>(false);
    const [totalCount,setTotalCount] = useState();
    useEffect(() => {
        fetchPokemons();
    }, [page, rowsPerPage]);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get(`/api/pokemons`, {
                params: {
                    limit: rowsPerPage,
                    offset: page * rowsPerPage,
                    name: search,
                    types: typeFilter,
                    min_experience: experienceRange[0],
                    max_experience: experienceRange[1],
                    show_legendary_only: showLegendaryOnly,
                },
            });
            setPokemons(response.data.pokemons);
            setTotalCount(response.data.totalCount)
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

    const handleTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTypeFilter(event.target.value as string[]);
        setPage(0);
    };

    const handleExperienceRangeChange = (event: Event, newValue: number | number[]) => {
        setExperienceRange(newValue as number[]);
    };

    const handleShowLegendary = () => setShowLegendaryOnly(!showLegendaryOnly);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage - 1);
    };

    return (
        <Container sx={{ maxWidth: '100%', padding: '2rem' }}>
            <Typography
                variant="h2"
                gutterBottom
                align="center"
                sx={{ color: '#ffcb05', fontFamily: '"Pokemon Solid", sans-serif', paddingTop: "2rem" }}
            >
                Pokémon List
            </Typography>

            {/* Button Group */}
            <Box mb={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap="1rem">
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
                        onChange={handleTypeFilterChange}
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
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "3.5rem" }}
                    onClick={handleSearchClick}
                >
                    Search
                </Button>
            </Box>

            {/* Experience Range Slider */}
            <Box mb={4}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '2rem' }}>
                <Grid container spacing={2}>
                    {pokemons.map((pokemon) => (
                        <Grid item xs={12} sm={6} md={3} key={pokemon.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                                    alt={pokemon.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{pokemon.name}</Typography>
                                    <Typography color="textSecondary">Base Experience: {pokemon.base_experience}</Typography>
                                    <Typography color="textSecondary">Types: {pokemon.types.join(', ')}</Typography>
                                    {pokemon.isLegendary && <Typography color="textPrimary">Legendary!!</Typography>}
                                </CardContent>
                                <Box p={2} display="flex" justifyContent="center">
                                    <Button variant="contained" color="primary">
                                        Catch Pokémon
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(totalCount / rowsPerPage)}
                    page={page + 1}
                    onChange={handleChangePage}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Container>
    );
};

export default PokemonList;
