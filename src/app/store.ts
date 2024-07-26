import { configureStore } from "@reduxjs/toolkit";
import { firestoreApi } from "./firestoreApi";
import addPath from "../features/addPathSlice";
import pathInfo from "../features/pathInfoSlice";
import search from "../features/search";
import snackbar from "../features/snackbarSlice";

export const store = configureStore({
  reducer: {
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    addPath,
    pathInfo,
    search,
    snackbar,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(firestoreApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
