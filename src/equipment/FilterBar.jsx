import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ViewArrayOutlinedIcon from "@mui/icons-material/ViewArrayOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ViewArray from "./ViewArray";
import FileDownload from "./FileDownload";
import FilterArray from "./FilterArray";

export default function FilterBar({
  visibleColumns,
  setVisibleColumns,
  fitnessData,
  itAssetsData,
  setFilteredFitnessData,
  setFilteredItAssetsData,
}) {
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [downloadAnchor, setDownloadAnchor] = useState(null);

  const handleOpen = (event) => setFilterAnchor(event.currentTarget);
  const handleClose = () => setFilterAnchor(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Filter Equipments</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            data-testid="filter-button"
            sx={{ border: "1px solid gray", p: 1 }}
            onClick={handleOpen}
          >
            <FilterAltOutlinedIcon />
          </IconButton>

          <IconButton
            data-testid="view-array-button"
            aria-label="View Columns"
            sx={{ border: "1px solid gray", p: 1 }}
            onClick={() => setFilterDialogOpen(true)}
          >
            <ViewArrayOutlinedIcon />
          </IconButton>

          <IconButton sx={{ border: "1px solid gray", p: 1 }}>
            <BookmarkBorderIcon />
          </IconButton>

          <IconButton
            aria-label="download"
            data-testid="download-button"
            sx={{ border: "1px solid gray", p: 1 }}
            onClick={(e) => setDownloadAnchor(e.currentTarget)}
          >
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 🔽 Filter menu connected here */}
      <FilterArray
        anchorEl={filterAnchor}
        handleClose={handleClose}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
        setFilteredFitnessData={setFilteredFitnessData}
        setFilteredItAssetsData={setFilteredItAssetsData}
      />

      {/* View Columns dialog */}
      <ViewArray
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
        filterDialogOpen={filterDialogOpen}
        setFilterDialogOpen={setFilterDialogOpen}
      />

      {/* FileDownload menu + dialogs */}
      <FileDownload
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
        downloadAnchor={downloadAnchor}
        setDownloadAnchor={setDownloadAnchor}
      />
    </>
  );
}
