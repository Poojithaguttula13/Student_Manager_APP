// EquipmentHeader.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import EquipmentHeader from "./EquipmentHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";

describe("EquipmentHeader Component", () => {
  const renderWithTheme = (component) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test("renders the Equipment title", () => {
    renderWithTheme(<EquipmentHeader />);
    const matches = screen.getAllByText(/Equipment/i);
    expect(matches[0]).toBeInTheDocument();
  });

});
