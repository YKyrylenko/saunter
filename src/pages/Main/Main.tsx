import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import RouteList from "./components/PathList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectedPathInfo, selectInfo } from "../../features/pathInfoSlice";
import PathInfo from "../../components/PathInfo";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import {
  useAddToFavoriteMutation,
  useDeletePathMutation,
  useGetPathsQuery,
} from "../../features/pathSlice";
import Search from "../../components/Search";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";
import { selectSearchTerm } from "../../features/search";

const Main = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useAppDispatch();

  const { showSnackbar } = useSnackbar();
  const searchTerm = useAppSelector(selectSearchTerm);

  const { data: paths } = useGetPathsQuery(searchTerm);
  const pathInfo = useAppSelector(selectInfo);

  const [addToFavorite, addToFavoriteResult] = useAddToFavoriteMutation();

  const [deletePath, deleteResult] = useDeletePathMutation();

  const handleAddToFavorite = (id: string) => () => {
    addToFavorite(id);
  };

  const handleDeletePath = (id: string) => () => {
    deletePath(id);

    dispatch(selectedPathInfo(null));
  };

  const handleSelectPath = (id: string) => () => {
    const path = paths?.find((el) => el.id === id);
    if (path) {
      dispatch(selectedPathInfo(path));
    }
  };
  useEffect(() => {
    if (deleteResult.status === "fulfilled") {
      showSnackbar("Path has been successfully deleted");
    }
  }, [deleteResult, showSnackbar]);

  useEffect(() => {
    if (addToFavoriteResult.status === "fulfilled") {
      showSnackbar("Path has been successfully added to favorite");
    }
  }, [addToFavoriteResult, showSnackbar]);

  return (
    <Box
      sx={{
        padding: {
          xs: 0,
          lg: 4,
        },
        paddingTop: {
          xs: 2,
        },
        height: {
          lg: "calc(100vh - 128px)",
        },
      }}
    >
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Grid container justifyContent="center" height="100%">
          <Grid item xs={12} lg={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Search />
              </Grid>
              <Grid item lg={12}>
                {!!paths?.length ? (
                  <RouteList
                    selectedPathId={pathInfo?.id || ""}
                    onSelectPath={handleSelectPath}
                    paths={paths || []}
                  />
                ) : (
                  <Alert severity="info">There is no path</Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
          {isLg && (
            <Grid item sm>
              <Grid container justifyContent="center" height="100%">
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} lg={5}>
            {pathInfo ? (
              <PathInfo
                pathInfo={pathInfo}
                onFavorite={handleAddToFavorite}
                onDelete={handleDeletePath}
              />
            ) : (
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12} lg={12}>
                  <Box
                    fontSize={104}
                    display="flex"
                    justifyContent="center"
                    alignItems="end"
                    height="100%"
                  >
                    <ZoomOutMapIcon fontSize="inherit" color="action" />
                  </Box>
                </Grid>
                <Grid xs={12} item lg={12}>
                  <Typography textAlign="center"> Select any path</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
