import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import AddPathForm from "../AddPathForm";
import GoogleMap from "../../../../components/GoogleMap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { reset } from "../../../../features/addPathSlice";

const AddPathDialog: FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    dispatch(reset());
  };

  return (
    <>
      <Button onClick={openDialog} variant="contained">
        Add Path
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="lg">
        <Box
          borderBottom="1px solid"
          borderColor={(theme) => theme.palette.grey[500]}
        >
          <DialogTitle color={(theme) => theme.palette.grey[700]}>
            Add new path
          </DialogTitle>
        </Box>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                order: {
                  xs: 1,
                  lg: 0,
                },
              }}
            >
              <AddPathForm close={closeDialog} />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                order: {
                  xs: 0,
                  lg: 1,
                },
              }}
            >
              <Box width="100%" height="100%" minHeight={500}>
                <GoogleMap />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPathDialog;
