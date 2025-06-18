import React from "react";
import { Box, Typography, IconButton, AppBar, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import { ContentWrapper } from "./ContentWrapper";
import { useUIContext } from "../context/UIContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useUIContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Northwind Products</Typography>
          </Link>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, p: 4 }}>
        <ContentWrapper>{children}</ContentWrapper>
      </Box>
    </Box>
  );
};
