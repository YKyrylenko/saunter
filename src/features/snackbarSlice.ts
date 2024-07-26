import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type SnackbarState = {
  open: boolean;
  message: string;
};

const initialState: SnackbarState = {
  open: false,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state: SnackbarState,
      { payload: message }: PayloadAction<string>
    ) => {
      state.open = true;
      state.message = message;
    },

    hideSnackbar: (state: SnackbarState) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const selectSnackbarOpen = (state: RootState) => state.snackbar.open;
export const selectSnackbarMessage = (state: RootState) =>
  state.snackbar.message;

export const { hideSnackbar, showSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
