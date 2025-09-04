import React from "react";
import { Typography, Button, Box, IconButton, Tooltip, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { GridSearchIcon } from "@mui/x-data-grid";
import { PersonOutline } from "@mui/icons-material";

function Navbar({ toggleTheme, mode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <Box sx={{ backgroundColor: "black", color: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 10,   // increased side padding (was 4)
          py: 3,
        }}
      >
        {/* Left Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px:4 }}>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 1 }}>
            EQUINOX
          </Typography>
          <Typography sx={{ color: "gray", fontWeight: 500 }}>| PHOTON</Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid gray",
            flex: 1,
            mx: 6,
            maxWidth: "450px",   // balanced search bar length
          }}
        >
          <GridSearchIcon sx={{ fontSize: 18, color: "gray", mr: 2 }} />
          <InputBase
            placeholder="Search anything or add bookmarks"
            sx={{
              fontSize: 14,
              width: "100%",
              color: "white",
              pb: 0.2,
            }}
          />
        </Box>

        {/* Right Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/studentPage")}>
            Dashboard
          </Typography>
          <Typography sx={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/equipment")}>
            Devices
          </Typography>
          <Typography sx={{ cursor: "pointer" }}>Software</Typography>

        {/* <IconButton
          sx={{
            border: "1px solid gray",
            borderRadius: "50%",
            p: 0.5,
          }}
        >
          <PersonOutline />
        </IconButton> */}

          <Tooltip title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
            <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: "white", color: "white", textTransform: "none" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Divider line */}
      <Box sx={{ borderBottom: "1px solid gray", width: "100%" }} />
    </Box>
  );
}

export default Navbar;
