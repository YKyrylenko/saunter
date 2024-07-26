import React from "react";
import { useSnackbar } from "./useSnackbar";
import { Snackbar as MuiSnackbar } from "@mui/material";

const Snackbar = () => {
  const { open, message, hideSnackbar } = useSnackbar();

  return (
    <MuiSnackbar
      open={open}
      onClose={hideSnackbar}
      autoHideDuration={4000}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};

export default Snackbar;
