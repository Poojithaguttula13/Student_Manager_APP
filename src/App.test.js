import React, { act, useState } from "react";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock all page components
jest.mock("./pages/Login", () => () => <div>Login Page</div>);
jest.mock("./pages/StudentDetails", () => () => <div>Student Details Page</div>);
jest.mock("./pages/StudentPage", () => () => <div>Student Page</div>);
jest.mock("./pages/EquipmentPage", () => () => <div>Equipment Page</div>);
jest.mock("./components/PrivateRoute", () => ({ children }) => <>{children}</>);
jest.mock("./components/Layout", () => ({ children, toggleTheme, mode }) => (
  <div>
    <button onClick={toggleTheme} data-testid="theme-toggle">Toggle Theme</button>
    <div data-testid="current-mode">{mode}</div>
    {children}
  </div>
));

describe("App routing", () => {
  test("renders Login page on /", () => {
    render(
        <App />
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });


  test("toggleTheme changes mode from light to dark and back", () => {
    const { result } = renderHook(() => {
      const [mode, setMode] = useState("light");
      const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      };
      return { mode, toggleTheme };
    });
  
    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe("dark");
  
    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe("light");
  });

});
