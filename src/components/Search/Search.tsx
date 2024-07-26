import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useDispatch } from "react-redux";
import { setTerm } from "../../features/search";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <TextField
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      placeholder="Search..."
      InputProps={{
        endAdornment: <SearchIcon color="action" fontSize="large" />,
      }}
    />
  );
};

export default Search;
