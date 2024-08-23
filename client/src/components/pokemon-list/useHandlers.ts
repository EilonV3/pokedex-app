import React, { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

interface UseHandlersParams {
  handleFetchPokemons: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setExperienceRange: React.Dispatch<React.SetStateAction<number[]>>;
  setShowCaughtOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLegendaryOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setSortOption: React.Dispatch<
    React.SetStateAction<
      "name-asc" | "name-desc" | "experience-asc" | "experience-desc"
    >
  >;
}

const useHandlers = ({
  handleFetchPokemons,
  setPage,
  setSearch,
  setTypeFilter,
  setExperienceRange,
  setShowCaughtOnly,
  setShowLegendaryOnly,
  setResultsPerPage,
  setSortOption,
}: UseHandlersParams) => {
  const handleSearchClick = () => {
    setPage(0);
    handleFetchPokemons();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleExperienceRangeChange = (
    _event: ChangeEvent,
    newValue: number[],
  ) => {
    setExperienceRange(newValue as number[]);
  };

  const handleShowCaughtOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowCaughtOnly(event.target.checked);
  };

  const handleShowLegendary = () => {
    setShowLegendaryOnly((prev) => !prev);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setResultsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  const handleSortOptionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSortOption(
      event.target.value as
        | "name-asc"
        | "name-desc"
        | "experience-asc"
        | "experience-desc",
    );
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetchPokemons();
      setPage(0);
    }
  };

  return {
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
  };
};

export default useHandlers;
