import React from "react";
import { Box, IconButton, Typography, InputBase, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";

export default function EquipmentHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        color: "white",
        px: 10,   // increased side padding (same as Navbar)
        py: 3,
      }}
    >
      {/* Left Section */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton sx={{ color: "white", p: 0 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Equipment
        </Typography>
      </Box>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
          borderRadius: "20px",
          px: 2,
          py: 0.5,
          flex: 1,
          mx: 6,
          maxWidth: "600px",   // reduced search bar length
        }}
      >
        <SearchIcon sx={{ fontSize: 18, color: "gray", mr: 1 }} />
        <InputBase
          placeholder="Search Equipment"
          sx={{
            fontSize: 14,
            width: "90%",
            color: "white",
          }}
        />
      </Box>

      {/* Right Section */}
      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          fontSize: "14px",
          textTransform: "none",
        }}
      >
        + Add Equipment
      </Button>
    </Box>
  );
}
