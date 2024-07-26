import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Path } from "../pages/Main/components/PathList/types";
import { RootState } from "../app/store";

type PathInfo = { info: Path | null };

const initialState: PathInfo = {
  info: null,
};

const pathInfoSlice = createSlice({
  name: "pathInfo",
  initialState,
  reducers: {
    selectedPathInfo: (
      state: PathInfo,
      { payload: pathInfo }: PayloadAction<Path | null>
    ) => {
      state.info = pathInfo;
    },
  },
});

export const selectInfo = (state: RootState) => state.pathInfo.info;

export const { selectedPathInfo } = pathInfoSlice.actions;

export default pathInfoSlice.reducer;
