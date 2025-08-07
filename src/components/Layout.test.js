import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

// Mock Navbar to isolate Layout test
jest.mock("./Navbar", () => (props) => (
  <div data-testid="navbar">Mock Navbar - Mode: {props.mode}</div>
));

describe("Layout component", () => {
  test("renders Navbar and children correctly", () => {
    const mockToggleTheme = jest.fn();

    render(
      <Layout toggleTheme={mockToggleTheme} mode="light">
        <div>Test Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId("navbar")).toHaveTextContent("Mock Navbar - Mode: light");
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });
});
