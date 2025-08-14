import React from "react";
import { render, screen } from "@testing-library/react";
import StudentPage from "./StudentPage";

// Mock child components
jest.mock("../features/students/StudentForm", () => () => <div>Mock Student Form</div>);
jest.mock("../features/students/StudentTable", () => () => <div>Mock Student Table</div>);

describe("StudentPage Component", () => {
  test("renders StudentForm and StudentTable", () => {
    render(<StudentPage />);

    // Check if both mocked components are present
    expect(screen.getByText(/Mock Student Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Student Table/i)).toBeInTheDocument();
  });
});
