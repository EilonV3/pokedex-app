import React from "react";
import { Typography } from "@mui/material";

const PokemonListHeader: React.FC = () => (
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
      Pokédex
  </Typography>
);

export default PokemonListHeader;
