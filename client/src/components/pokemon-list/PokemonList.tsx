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
                },
            });
            setPokemons(response.data);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
    };

    const handleSearchClick = () => {
        setPage(0);
        fetchPokemons();
    };

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };
    //
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

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

    return (
        <Container>
            <Typography variant="h2" gutterBottom align="center" style={{ color: '#ffcb05', fontFamily: '"Pokemon Solid", sans-serif', paddingTop: "2rem"}}>
                Pokémon List
            </Typography>
            <Box mb={4}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            label="Search Pokémon"
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Type</InputLabel>
                            <Select
                                multiple
                                value={typeFilter}
                                onChange={handleTypeFilterChange}
                                // renderValue={(selected) => (selected as string[]).join(', ')}
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
                                {/* Add more Pokémon types as needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button variant="contained" color="primary" onClick={handleSearchClick}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
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
                            </CardContent>
                            <Box p={2} display="flex" justifyContent="center">
                                <Button variant="contained" color="primary" onClick={() => console.log('clicked on pokemon', pokemon.name)}>
                                    Catch Pokémon
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PokemonList;
