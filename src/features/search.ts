import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type Search = {
  searchTerm: string;
};

const initialState: Search = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTerm: (
      state: Search,
      { payload: searchTerm }: PayloadAction<string>
    ) => {
      state.searchTerm = searchTerm;
    },
  },
});

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const { setTerm } = searchSlice.actions;
export default searchSlice.reducer;
