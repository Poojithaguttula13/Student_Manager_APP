import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { toast } from "react-toastify";

// Mock toast and navigate
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("NavBar Component", () => {
  
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const toggleThemeMock = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderComponent = (mode = "light") => {
    render(
      <BrowserRouter>
        <Navbar toggleTheme={toggleThemeMock} mode={mode} />
      </BrowserRouter>
    );
  };

  test("renders title", () => {
    renderComponent();
    expect(screen.getByText("Student Management System")).toBeInTheDocument();
  });

  test("calls toggleTheme when theme icon is clicked", () => {
    renderComponent("light");
    const iconButton = screen.getByRole("button", { name: /switch to dark mode/i });
    fireEvent.click(iconButton);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it("should log out the user and navigate to '/'", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Simulate clicking the Logout button
    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutBtn);

    // Assertions
    expect(localStorage.getItem("token")).toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Logout successful!");
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });

});
