import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DownloadIcon from "@mui/icons-material/Download";

export default function FilterBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // bgcolor: "#141414", // dark background
        px: 3,
        py: 2,
      }}
    >
      {/* Left Text */}
      <Typography sx={{ fontSize: 20 }}>
        Filter Equipments
      </Typography>

      {/* Right Icons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          sx={{
            border: "1px solid gray",
            // color: "white",
            p: 1,
          }}
        >
          <FilterListIcon />
        </IconButton>

        <IconButton
          sx={{
            border: "1px solid gray",
            // color: "white",
            p: 1,
          }}
        >
          <ViewModuleIcon />
        </IconButton>

        <IconButton
          sx={{
            border: "1px solid gray",
            // color: "white",
            p: 1,
          }}
        >
          <BookmarkBorderIcon />
        </IconButton>

        <IconButton
          sx={{
            border: "1px solid gray",
            // color: "white",
            p: 1,
          }}
        >
          <DownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
