import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { Pokemon } from "../../types/Pokemon";
import PokemonCard from "../pokemon-card/PokemonCard.tsx";
import PokemonFilter from "../pokemon-filter/PokemonFilter.tsx";
import PaginationComponent from "../pagination/Pagination.tsx";
import useHandlers from "./useHandlers.ts";
import useApiActions from "./useApiActions.ts";
const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState<number[]>([0, 1000]);
  const [showLegendaryOnly, setShowLegendaryOnly] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number | undefined>(0);
  const [sortOption, setSortOption] = useState<string>("");
  const [showCaughtOnly, setShowCaughtOnly] = useState(false);

  const { handleFetchPokemons, handleCatchPokemon } = useApiActions({
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
  });

  useEffect(() => {
    handleFetchPokemons();
  }, [page, resultsPerPage, showCaughtOnly, showLegendaryOnly, sortOption]);

  const {
    handleSearchClick,
    handleSearchChange,
    handleExperienceRangeChange,
    handleShowCaughtOnlyChange,
    handleShowLegendary,
    handleChangePage,
    handleRowsPerPageChange,
    handleSortOptionChange,
    handleTypeFilterChange,
    handleKeyDown,
  } = useHandlers({
    handleFetchPokemons,
    setPage,
    setSearch,
    setTypeFilter,
    setExperienceRange,
    setShowCaughtOnly,
    setShowLegendaryOnly,
    setResultsPerPage,
    // @ts-ignore
    setSortOption,
  });

  return (
    <Container sx={{ minWidth: "100%", fontFamily: '"Roboto", sans-serif' }}>
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        color="textPrimary"
        sx={{
          fontFamily: '"Pokemon Solid", sans-serif',
          paddingTop: "2rem",
          background: "linear-gradient(135deg, #FFD700 0%, #FFB800 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Pokémon List
      </Typography>

      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="1rem"
      >
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

      <Grid container spacing={4}>
        {pokemons.map((pokemon) => (
          <Grid item md={2} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} onCatch={handleCatchPokemon} />
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
