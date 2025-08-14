import React, { useState } from "react";
import { Typography, Button, Box, IconButton, Tooltip, TextField, InputAdornment, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { GridSearchIcon } from "@mui/x-data-grid";
import { PersonOutline } from "@mui/icons-material";

function Navbar({ toggleTheme, mode }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // if (onSearch) onSearch(e.target.value); // Optional callback for parent
  };

  return (
    <>
    
    <Box
      sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { xs: "auto", sm: "80px" },
          px: 8,
          py: {
            xs: 1,
            sm: 1,
            md: 1,
          },
          boxShadow: 1,
          gap: { xs: 1, sm: 0 },
        }}
      >
      {/* Left Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontWeight: "bold", letterSpacing: 2 }}>
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
          mx: 10,
          maxWidth: "800px",
        }}
      >
        <GridSearchIcon sx={{ fontSize: 16, color: "gray" }} />
        <InputBase
          placeholder="Search anything or add bookmarks"
          sx={{
            // color: "white",
            fontSize: 14,
            width: "100%",
          }}
        />
      </Box>
      {/* </Box> */}

      {/* Right Menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/studentPage")}
      >
        Dashboard
      </Typography>

      <Typography sx={{ cursor: "pointer" }}
        onClick={() => navigate("/equipment")}
        >
        Devices
      </Typography>
        <Typography sx={{ cursor: "pointer" }}>Software</Typography>
        <IconButton
          sx={{
            // color: "white",
            // border: "1px solid black",
            border: "1px solid gray",
            borderRadius: "50%",
            p: 0.5,
          }}
        >
          <PersonOutline />
        </IconButton>
      {/* </Box> */}


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
    
    </>
    
  );
}

export default Navbar;

