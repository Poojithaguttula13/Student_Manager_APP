// MenuBar.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuBar from "./MenuBar";

describe("MenuBar Component", () => {
  const mockOnChange = jest.fn();
  const mockOptions = [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders button with correct label", () => {
    render(
      <MenuBar
        icon={<span>Icon</span>}
        label="Test Menu"
        options={mockOptions}
        selected={[]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole("button", { name: /Test Menu/i })).toBeInTheDocument();
  });

  test("opens menu when button is clicked", () => {
    render(
      <MenuBar
        icon={<span>Icon</span>}
        label="Open Menu"
        options={mockOptions}
        selected={[]}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Open Menu/i }));
    expect(screen.getByRole("menu")).toBeVisible();
  });

  test("calls onChange when an option is clicked", () => {
    render(
      <MenuBar
        label="Menu"
        options={mockOptions}
        selected={[]}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Menu/i }));
    fireEvent.click(screen.getByText("Option 1"));

    expect(mockOnChange).toHaveBeenCalledWith("opt1");
  });

  test("menu closes after selecting when multiple=false", () => {
    render(
      <MenuBar
        label="Menu"
        options={mockOptions}
        selected={[]}
        multiple={false}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Menu/i }));
    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("menu stays open after selecting when multiple=true", () => {
    render(
      <MenuBar
        label="Menu"
        options={mockOptions}
        selected={[]}
        multiple={true}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Menu/i }));
    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.getByRole("menu")).toBeVisible();
  });

});
