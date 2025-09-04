import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import FilterBar from "./FilterBar";

const mockFilterArrayProps = {};
const mockViewArrayProps = {};
const mockFileDownloadProps = {};

jest.mock("./FilterArray", () => (props) => {
  Object.assign(mockFilterArrayProps, props);
  return <div data-testid="filter-array" />;
});

jest.mock("./ViewArray", () => (props) => {
  Object.assign(mockViewArrayProps, props);
  return <div data-testid="view-array" />;
});

jest.mock("./FileDownload", () => (props) => {
  Object.assign(mockFileDownloadProps, props);
  return <div data-testid="file-download" />;
});



describe("FilterBar Component", () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      visibleColumns: ["col1", "col2"],
      setVisibleColumns: jest.fn(),
      fitnessData: [{ id: 1, name: "Treadmill" }],
      itAssetsData: [{ id: 101, asset: "Laptop" }],
      setFilteredFitnessData: jest.fn(),
      setFilteredItAssetsData: jest.fn(),
    };
  });

  test("opens filter menu when filter button is clicked", () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("filter-button"));
  
    expect(mockFilterArrayProps.anchorEl).not.toBeNull();
  });

  test("closes filter menu when handleClose is called", () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("filter-button"));
  
    expect(mockFilterArrayProps.anchorEl).not.toBeNull();
  
    act(() => {
      mockFilterArrayProps.handleClose();
    });
  
    expect(mockFilterArrayProps.anchorEl).toBeNull();
  });

  test("opens ViewArray dialog when view button is clicked", () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("view-array-button"));
  
    expect(mockViewArrayProps.filterDialogOpen).toBe(true);
  });

});

