import React, { FC } from "react";
import PathItem from "../PathItem";
import { List } from "@mui/material";
import { Props } from "./types";

const PathList: FC<Props> = ({ paths, selectedPathId, onSelectPath }) => {
  return (
    <List
      sx={{
        maxHeight: "calc(100vh - 216px)",
        overflowY: "auto",
      }}
    >
      {paths?.map((el) => (
        <PathItem
          path={el}
          key={el.id}
          selectedPathId={selectedPathId}
          onSelectPath={onSelectPath}
        />
      ))}
    </List>
  );
};

export default PathList;
