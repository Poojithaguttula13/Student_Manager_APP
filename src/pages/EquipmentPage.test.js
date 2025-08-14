// EquipmentPage.test.js
import { render, screen } from "@testing-library/react";
import EquipmentPage from "./EquipmentPage";

// Mock the child components
jest.mock("../equipment/EquipmentHeader", () => () => (
  <div data-testid="mock-header">Mock Header</div>
));

jest.mock("../equipment/EquipmentTable", () => () => (
  <div data-testid="mock-table">Mock Table</div>
));

jest.mock("../equipment/FilterBar", () => () => (
  <div data-testid="mock-filter">Mock Filter</div>
));

jest.mock("../equipment/EquipmentCorosuel", () => ({ header, table, filter }) => (
  <div data-testid="mock-corosuel">
    <div>{header}</div>
    <div>{table}</div>
    <div>{filter}</div>
  </div>
));

describe("EquipmentPage", () => {
  test("renders EquipmentCorosuel with header, table, and filter props", () => {
    render(<EquipmentPage />);

    // Verify each mocked child is rendered
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
    expect(screen.getByTestId("mock-filter")).toBeInTheDocument();
    expect(screen.getByTestId("mock-corosuel")).toBeInTheDocument();
  });
});
