// src/equipment/FilterBar.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import FilterBar from "./FilterBar";

describe("FilterBar Component", () => {
    test("renders the title text", () => {
        render(<FilterBar />);
        expect(screen.getByText(/Filter Equipments/i)).toBeInTheDocument();
      });

});
