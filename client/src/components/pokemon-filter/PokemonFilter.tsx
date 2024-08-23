import React, {ReactNode} from 'react';
import {
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Slider,
    Typography,
    InputLabel, FormControl, SelectChangeEvent
} from '@mui/material';

interface PokemonFilterProps {
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchClick: () => void;
    showLegendaryOnly: boolean;
    onShowLegendaryToggle: () => void;
    typeFilter: string[];
    onTypeFilterChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
    sortOption: string;
    onSortOptionChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
    experienceRange: number[];
    onExperienceRangeChange: (e: React.ChangeEvent, newValue: number[]) => void;
    showCaughtOnly: boolean;
    onShowCaughtOnlyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({
                                                         search,
                                                         onSearchChange,
                                                         onSearchClick,
                                                         showLegendaryOnly,
                                                         onShowLegendaryToggle,
                                                         typeFilter,
                                                         onTypeFilterChange,
                                                         sortOption,
                                                         onSortOptionChange,
                                                         experienceRange,
                                                         onExperienceRangeChange,
                                                         showCaughtOnly,
                                                         onShowCaughtOnlyChange,
                            onKeyDown: onKeyDown,
                                                     }) => {
    return (<>
            <TextField
                sx={{ flex: '1 1 auto', maxWidth: "12rem", height: "4rem" }}
                label="Search Pokémon"
                variant="outlined"
                value={search}
                onChange={onSearchChange}
                onKeyDown={onKeyDown}
            />
            <Button
                sx={{ flex: '1 1 auto', minWidth: "2rem", maxWidth: "12rem", height: "3.5rem" }}
                variant="outlined"
                onClick={onShowLegendaryToggle}
            >
                {showLegendaryOnly ? 'Show All' : 'Show Legendary'}
            </Button>
            <FormControl sx={{ flex: '1 1 auto', width: "4rem", maxWidth: "12rem", height: "3.5rem" }} variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                    multiple
                    value={typeFilter}
                    onChange={onTypeFilterChange}
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
            <FormControl variant="outlined" sx={{ minWidth: 200, width: "4rem" }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortOption}
                    // @ts-ignore
                    onChange={onSortOptionChange}
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
                    // @ts-ignore
                    onChange={onExperienceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                    aria-labelledby="experience-range-slider"
                />
            </Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={showCaughtOnly}
                        onChange={onShowCaughtOnlyChange}
                        color="primary"
                    />
                }
                label="Show Caught Only"
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ flex: '1 1 auto', maxWidth: "8rem", height: "3.5rem" }}
                onClick={onSearchClick}
            >
                Search
            </Button>
</>
    );
};

export default PokemonFilter;
