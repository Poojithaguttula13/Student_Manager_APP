import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import StudentTable from "./StudentTable";

export default function GradeFilter() {
  const [filterGrade, setFilterGrade] = useState("All");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "flex-end",
            md: "flex-end",
            lg: "flex-end",
          },
          mb: 2,
          px: {
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
          },
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="grade-label" >Filter by Grade</InputLabel>
          <Select labelId="grade-label" 
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            label="Filter by Grade"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <StudentTable filterGrade={filterGrade} />
    </>
  );
}