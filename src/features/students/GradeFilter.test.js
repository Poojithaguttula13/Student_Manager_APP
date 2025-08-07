import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GradeFilter from "./GradeFilter";

// Mock StudentTable component
jest.mock("./StudentTable", () => ({ filterGrade }) => (
  <div data-testid="student-table">Mock Table - Grade: {filterGrade}</div>
));

describe("GradeFilter component", () => {
  it("renders filter dropdown and passes selected grade to StudentTable", () => {
    render(<GradeFilter />);

    // Check if the dropdown is rendered
    const select = screen.getByLabelText("Filter by Grade");
    expect(select).toBeInTheDocument();

    // Default value should be "All"
    expect(screen.getByTestId("student-table")).toHaveTextContent("Grade: All");

    // Change dropdown value to "B"
    fireEvent.mouseDown(select); // open dropdown
    const optionB = screen.getByRole("option", { name: "B" });
    fireEvent.click(optionB);

    // After selection, StudentTable should reflect the updated filter
    expect(screen.getByTestId("student-table")).toHaveTextContent("Grade: B");
  });
});
