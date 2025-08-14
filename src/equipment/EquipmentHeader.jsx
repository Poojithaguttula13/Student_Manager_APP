import React from "react";
import { Box, IconButton, Typography, InputBase, Button, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";

export default function EquipmentHeader() {
    const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "#000",
        padding: "20px 20px",
      }}
    >
      {/* Left Section */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            // color: "#fff",
            fontWeight: "bold",
            // borderRight: "1px solid #444",
            paddingRight: 2,
          }}
        >
          Equipment
        </Typography>
      </Box>

<Box
        sx={{
          display: "flex",
          alignItems: "center",
        border:"1px solid #444",
        borderColor:"GrayText",
          borderRadius: "20px",
          px: 2,
          py: 0.5,
          width: "30%",
        }}
      >
        <SearchIcon sx={{ fontSize: 18, color: "gray", mr: 1 }} />
        <InputBase
          placeholder="Search Equipment"
          sx={{
            fontSize: 14,
            width: "100%",
          }}
        />
      </Box>
      
      {/* Right Section */}
      <Button
        variant="outlined"
        sx={{
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
          fontSize: "14px",
          borderRadius: 0,
          
        }}
      >
        + Add Equipment
      </Button>
    </Box>
  );
}
