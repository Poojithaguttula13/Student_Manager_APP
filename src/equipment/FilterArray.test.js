import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import FilterArray from "./FilterArray";

describe("FilterArray Component", () => {
  const mockFitnessData = [
    { name: "Treadmill", category: "Cardio", lastActivity: "2023-09-01 | 12:00" },
    { name: "Dumbbell", category: "Strength", lastActivity: "2023-09-02" },
  ];

  const mockItAssetsData = [
    { name: "Laptop", category: "Electronics", serialNumber: "A1234567890" },
    { name: "Monitor", category: "Electronics", serialNumber: "B1234567890" },
  ];

  let setFilteredFitnessData, setFilteredItAssetsData;

  beforeEach(() => {
    setFilteredFitnessData = jest.fn();
    setFilteredItAssetsData = jest.fn();
  });

  const setup = () =>
    render(
      <FilterArray
        anchorEl={document.body}
        handleClose={jest.fn()}
        fitnessData={mockFitnessData}
        itAssetsData={mockItAssetsData}
        setFilteredFitnessData={setFilteredFitnessData}
        setFilteredItAssetsData={setFilteredItAssetsData}
      />
    );

  test("renders filters title", () => {
    setup();
    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
  });

  test("expands and collapses a header section", async () => {
    setup();
    const categoryHeader = screen.getByText("Category");
    fireEvent.click(categoryHeader);
  
    expect(screen.getByPlaceholderText(/Search…/i)).toBeInTheDocument();
  
    fireEvent.click(categoryHeader); // collapse
  
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(/Search…/i)).not.toBeInTheDocument()
    );
  });

  test("filters data when checkbox is selected", () => {
    setup();
    fireEvent.click(screen.getByText("Category")); // expand
  
    const cardioItem = screen.getByText("Cardio").closest("li");
    const checkbox = within(cardioItem).getByRole("checkbox");
  
    fireEvent.click(checkbox);
  
    expect(setFilteredFitnessData).toHaveBeenCalled();
    expect(setFilteredItAssetsData).toHaveBeenCalled();
  });

  test("applies lastActivity filters when checkboxes are selected", () => {
    setup();
    fireEvent.click(screen.getByText("Last Activity")); // expand
  
    const dateItem = screen.getByText("Date").closest("li");
    const dateCheckbox = within(dateItem).getByRole("checkbox");
  
    fireEvent.click(dateCheckbox);
  
    expect(setFilteredFitnessData).toHaveBeenCalled();
    expect(setFilteredItAssetsData).toHaveBeenCalled();
  });
  

  test("validates serial number input", () => {
    setup();
    fireEvent.click(screen.getByText("Serial Number"));

    const input = screen.getByPlaceholderText(/Enter Serial Number/i);

    fireEvent.change(input, { target: { value: "123" } });
    expect(
      screen.getByText(/Format must be 1 alphabet \+ 10 digits/i)
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "A1234567890" } });
    expect(
      screen.queryByText(/Format must be 1 alphabet \+ 10 digits/i)
    ).not.toBeInTheDocument();
  });

  test("search inside a header filters options", () => {
    setup();
    fireEvent.click(screen.getByText("Category"));

    const searchInput = screen.getByPlaceholderText(/Search…/i);
    fireEvent.change(searchInput, { target: { value: "Cardio" } });

    expect(screen.getByText("Cardio")).toBeInTheDocument();
    expect(screen.queryByText("Strength")).not.toBeInTheDocument();
  });

  test("shows lastActivity filters", () => {
    setup();
    fireEvent.click(screen.getByText("Last Activity"));

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Date & Time")).toBeInTheDocument();
  });
});
