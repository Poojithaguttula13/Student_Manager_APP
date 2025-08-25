// // src/equipment/FilterBar.test.js
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import FilterBar from "./FilterBar";

// describe("FilterBar Component", () => {
//     test("renders the title text", () => {
//         render(<FilterBar />);
//         expect(screen.getByText(/Filter Equipments/i)).toBeInTheDocument();
//       });

// });


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

// Mock XLSX and jsPDF
jest.mock("xlsx", () => ({
  utils: {
    book_new: jest.fn(() => ({})),
    json_to_sheet: jest.fn(() => ({})),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    save: jest.fn(),
    lastAutoTable: { finalY: 30 },
  }));
});

jest.mock("jspdf-autotable", () => jest.fn());

describe("FilterBar Component", () => {
  let setVisibleColumns;
  const fitnessData = [{ device: "Treadmill", id: 1 }];
  const itAssetsData = [{ asset: "Laptop", id: 2 }];
  const visibleColumns = { device: true, asset: true };

  beforeEach(() => {
    setVisibleColumns = jest.fn();
    window.alert = jest.fn();
  });

  test("renders filter bar title and buttons", () => {
    render(
      <FilterBar
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
      />
    );

    expect(screen.getByText(/Filter Equipments/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4); // Filter, View, Bookmark, Download
  });

  test("opens column filter menu and toggles a column", () => {
    render(
      <FilterBar
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]); // Filter button
    expect(screen.getByText(/DEVICE/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/DEVICE/i));
    expect(setVisibleColumns).toHaveBeenCalled();
  });

  test("opens download menu and shows options", () => {
    render(
      <FilterBar
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[3]); // Download button
    expect(screen.getByText(/Export to Excel/i)).toBeInTheDocument();
    expect(screen.getByText(/Send via Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Download PDF/i)).toBeInTheDocument();
  });

  test("exports Excel when clicked", () => {
    render(
      <FilterBar
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[3]);
    fireEvent.click(screen.getByText(/Export to Excel/i));

    expect(XLSX.writeFile).toHaveBeenCalled();
  });

  

});
