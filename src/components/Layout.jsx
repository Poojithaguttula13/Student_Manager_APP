import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

export default function Layout({ children, toggleTheme, mode }) {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} mode={mode} />
      <Box component="main">{children}</Box>
    </>
  );
}