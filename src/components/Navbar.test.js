import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Mock navigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

describe("Navbar Component", () => {
  const mockNavigate = jest.fn();
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders with light mode and toggles theme", () => {
    render(<Navbar toggleTheme={mockToggleTheme} mode="light" />);

    // Light mode should show DarkModeIcon
    const toggleBtn = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();

    // Click to toggle
    fireEvent.click(toggleBtn);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test("renders with dark mode", () => {
    render(<Navbar toggleTheme={mockToggleTheme} mode="dark" />);
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });

  test("navigates when clicking Dashboard", () => {
    render(<Navbar toggleTheme={mockToggleTheme} mode="light" />);

    fireEvent.click(screen.getByText(/dashboard/i));
    expect(mockNavigate).toHaveBeenCalledWith("/studentPage");
  });

  test("navigates when clicking Devices", () => {
    render(<Navbar toggleTheme={mockToggleTheme} mode="light" />);

    fireEvent.click(screen.getByText(/devices/i));
    expect(mockNavigate).toHaveBeenCalledWith("/equipment");
  });

  test("handles logout", () => {
    localStorage.setItem("token", "123");

    render(<Navbar toggleTheme={mockToggleTheme} mode="light" />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(localStorage.getItem("token")).toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Logout successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("updates search term on input change", () => {
    render(<Navbar toggleTheme={mockToggleTheme} mode="light" />);

    const searchInput = screen.getByPlaceholderText(/search anything or add bookmarks/i);
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(searchInput.value).toBe("test search");
  });

});
