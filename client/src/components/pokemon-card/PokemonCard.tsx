import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Pokemon } from '../../types/Pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
    onCatch: (pokemonId: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onCatch }) => {
    return (
        <Card
            sx={{
                width: '14rem',
                height: '100%',
                maxHeight: '22rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pokemon.isLegendary ? '4px solid gold' : '4px solid transparent',
                boxShadow: pokemon.isLegendary ? '0 0 10px 5px rgba(255, 215, 0, 0.5)' : '',
                animation: pokemon.isLegendary ? 'glow 0.8s infinite alternate' : 'none',
                '@keyframes glow': {
                    '0%': { boxShadow: '0 0 5px gold' },
                    '100%': { boxShadow: '1px 1px 16px gold' },
                },
            }}
        >
            <CardMedia
                component="img"
                sx={{ height: '120px', objectFit: 'contain', padding: '8px' }}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={pokemon.name}
            />
            <CardContent sx={{ padding: '8px', textAlign: 'center' }}>
                <Typography variant="h6">{pokemon.name}</Typography>
                <Typography color="textSecondary">Base Experience: {pokemon.base_experience}</Typography>
                <Typography color="textSecondary">Types: {pokemon.types.join(', ')}</Typography>
                {pokemon.isLegendary && (
                    <Typography
                        color="textPrimary"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFB800 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'pulse 1.5s infinite',
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(1)', textShadow: '0 0 1px rgba(255, 223, 0, 0.8), 0 0 2px rgba(255, 223, 0, 0.6)' },
                                '50%': { transform: 'scale(1.1)', textShadow: '0 0 2px rgba(255, 223, 0, 1), 0 0 8px rgba(255, 223, 0, 0.8)' },
                                '100%': { transform: 'scale(1)', textShadow: '0 0 1px rgba(255, 223, 0, 0.8), 0 0 2px rgba(255, 223, 0, 0.6)' },
                            },
                        }}
                    >
                        Legendary
                    </Typography>
                )}
            </CardContent>
            <Box p={1} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onCatch(pokemon.id)}
                    sx={{
                        backgroundColor: pokemon.isCaught ? 'green' : 'primary.main',
                        animation: pokemon.isCaught ? 'caught 1s ease-in-out' : 'none',
                        '@keyframes caught': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.2)' },
                            '100%': { transform: 'scale(1)' },
                        },
                    }}
                >
                    {pokemon.isCaught ? 'Caught!' : 'Catch Pokémon'}
                </Button>
            </Box>
        </Card>
    );
};

export default PokemonCard;