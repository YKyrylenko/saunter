import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import AddRouteDialog from "../../pages/Main/components/AddPathDialog";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const Header = () => {
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="lg">
        <Toolbar>
          <ZoomOutMapIcon
            fontSize="large"
            sx={{
              mr: 2,
            }}
            color="action"
          />
          <Typography variant="h6" sx={{ flexGrow: "1" }}>
            Saunter
          </Typography>
          <AddRouteDialog />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
