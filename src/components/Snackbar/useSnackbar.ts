import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  hideSnackbar,
  selectSnackbarMessage,
  selectSnackbarOpen,
  showSnackbar,
} from "../../features/snackbarSlice";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  return {
    open: useAppSelector(selectSnackbarOpen),
    message: useAppSelector(selectSnackbarMessage),
    showSnackbar: useCallback(
      (message: string) => {
        dispatch(showSnackbar(message));
      },
      [dispatch]
    ),
    hideSnackbar: useCallback(() => {
      dispatch(hideSnackbar());
    }, [dispatch]),
  };
};
