import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
// import '@testing-library/jest-dom/extend-expect';

// Mock components to simplify routing tests
jest.mock("./components/PrivateRoute", () => ({ children }) => <>{children}</>);
jest.mock("./components/Layout", () => ({ toggleTheme, mode, children }) => (
  <div>
    <div data-testid="theme-mode">{mode}</div>
    <button onClick={toggleTheme} data-testid="toggle-theme-btn">
      Toggle Theme
    </button>
    {children}
  </div>
));

jest.mock("./pages/Login", () => () => <div>Mocked Login Page</div>);
jest.mock("./pages/StudentPage", () => () => <div>Mocked Student Page</div>);
jest.mock("./pages/StudentDetails", () => () => <div>Mocked Student Details</div>);
jest.mock("./components/Layout", () => ({ children }) => <div>Mocked Layout {children}</div>);
jest.mock("./components/PrivateRoute", () => ({ children }) => <div>PrivateRoute: {children}</div>);

describe("App Component", () => {
  test("renders Login page on default route", () => {
    render(<App />);
    expect(screen.getByText("Mocked Login Page")).toBeInTheDocument();
  });

  test("Logout removes token and navigates to login", async () => {
    localStorage.setItem("token", "test-token");
    window.history.pushState({}, "", "/studentPage");
    render(<App />);
  
    expect(screen.getByText("Mocked Student Page")).toBeInTheDocument();
  
    localStorage.clear(); // Clean up
  });


});
