import React from "react";
import { Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Navbar({ toggleTheme, mode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "primary.main",
        color: "white",
        height: { xs: "auto", sm: "60px" },
        px: 2,
        py: {
          xs: 1,
          sm: 1,
          md: 0,
        },
        boxShadow: 1,
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: {
            xs: "18px",
            sm: "18px",
            md: "20px",
          },
        }}
      >
        Student Management System
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip
          title={
            mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Navbar;