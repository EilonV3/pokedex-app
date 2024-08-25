import React, { ChangeEvent, ReactNode } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";

interface PaginationComponentProps {
  totalCount: number;
  resultsPerPage: number;
  page: number;
  onChangePage: (event: ChangeEvent<unknown>, page: number) => void;
  onRowsPerPageChange: (
    event: SelectChangeEvent<string>,
    child: ReactNode,
  ) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  resultsPerPage,
  page,
  onChangePage,
  onRowsPerPageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={Math.ceil(totalCount / resultsPerPage)}
        page={page + 1}
        onChange={onChangePage}
        color="primary"
        shape="rounded"
        sx={{ margin: "1rem" }}
      />
      <FormControl
        sx={{ width: "9rem", height: "4rem", textAlign: "center" }}
        variant="outlined"
      >
        <InputLabel>Results per page</InputLabel>
        <Select
          value={resultsPerPage.toString()}
          onChange={onRowsPerPageChange}
          label="Results per page"
        >
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={72}>72</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PaginationComponent;
