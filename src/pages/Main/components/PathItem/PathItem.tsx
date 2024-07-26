import React, { FC } from "react";
import { Props } from "./types";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { metersToKilometers } from "../../../../utils/metersToKilometers";
import StarIcon from "@mui/icons-material/Star";

const listItemSx = {
  ":not(:first-child)": {
    mt: 2,
  },
  cursor: "pointer",
  borderRadius: 1,
};

const PathItem: FC<Props> = ({
  path: { description, isFavorite, title, pathLength, id },
  selectedPathId,
  onSelectPath,
}) => {
  const primaryText = (
    <Typography
      fontWeight={600}
      sx={{
        wordBreak: "break-word",
      }}
      color={selectedPathId === id ? "white" : "initial"}
    >
      {title}
    </Typography>
  );

  return (
    <ListItem
      onClick={onSelectPath(id)}
      sx={{
        backgroundColor: "rgba(239, 239, 240, 0.7)",
        ...listItemSx,
      }}
      {...(selectedPathId === id && {
        sx: {
          ...listItemSx,
          backgroundColor: (theme) => theme.palette.primary.light,
        },
      })}
    >
      <ListItemIcon>
        <ZoomOutMapIcon
          fontSize="large"
          {...(selectedPathId === id && {
            sx: {
              color: "white",
            },
          })}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          isFavorite ? (
            <Box display="flex" alignItems="center" gap={1}>
              <StarIcon color="primary" fontSize="small" />
              {primaryText}
            </Box>
          ) : (
            primaryText
          )
        }
        secondary={
          <Tooltip title={description} arrow placement="bottom-start">
            <Typography
              fontSize={14}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                wordBreak: "break-word",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
              color={selectedPathId === id ? "white" : "initial"}
              component="span"
            >
              {description}
            </Typography>
          </Tooltip>
        }
      />
      <Typography
        fontWeight={500}
        sx={{ textWrap: "nowrap" }}
        color={selectedPathId === id ? "white" : "initial"}
      >
        {metersToKilometers(pathLength)}
      </Typography>
    </ListItem>
  );
};

export default PathItem;
