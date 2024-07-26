import React, { FC } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import { Props } from "./types";
import { metersToKilometers } from "../../utils/metersToKilometers";
import GoogleMap from "../GoogleMap";

const PathInfo: FC<Props> = ({
  pathInfo: {
    title,
    fullDescription,
    pathLength,
    isFavorite,
    destination,
    origin,
    waypoints,
    id,
  },
  onFavorite,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: {
          lg: "calc(100vh - 128px)",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Grid container>
            <Grid item xs={12} lg>
              <Typography
                variant="h5"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={700}>
                {metersToKilometers(pathLength)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            sx={{
              wordBreak: "break-word",
            }}
          >
            {fullDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box width="100%" height="100%" minHeight={500}>
            <GoogleMap
              pathDestination={destination}
              pathOrigin={origin}
              pathWaypoints={waypoints}
              pathMarks={[
                {} as google.maps.LatLngLiteral,
                {} as google.maps.LatLngLiteral,
              ]}
              isView={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Grid container justifyContent="flex-end">
            {!isFavorite && (
              <Grid item lg={12}>
                <Grid container justifyContent="flex-end">
                  <Link
                    component="button"
                    fontWeight={500}
                    onClick={onFavorite(id)}
                  >
                    Add to favorite
                  </Link>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} lg={12}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component="button"
                    fontWeight={500}
                    color="error"
                    onClick={onDelete(id)}
                  >
                    Delete
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PathInfo;
