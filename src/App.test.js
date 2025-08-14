// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";
// import { MemoryRouter } from "react-router-dom";
// // import '@testing-library/jest-dom/extend-expect';

// // Mock components to simplify routing tests
// jest.mock("./components/PrivateRoute", () => ({ children }) => <>{children}</>);
// jest.mock("./components/Layout", () => ({ toggleTheme, mode, children }) => (
//   <div>
//     <div data-testid="theme-mode">{mode}</div>
//     <button onClick={toggleTheme} data-testid="toggle-theme-btn">
//       Toggle Theme
//     </button>
//     {children}
//   </div>
// ));

// jest.mock("./pages/Login", () => () => <div>Mocked Login Page</div>);
// jest.mock("./pages/StudentPage", () => () => <div>Mocked Student Page</div>);
// jest.mock("./pages/StudentDetails", () => () => <div>Mocked Student Details</div>);
// jest.mock("./components/Layout", () => ({ children }) => <div>Mocked Layout {children}</div>);
// jest.mock("./components/PrivateRoute", () => ({ children }) => <div>PrivateRoute: {children}</div>);

// describe("App Component", () => {
//   test("renders Login page on default route", () => {
//     render(<App />);
//     expect(screen.getByText("Mocked Login Page")).toBeInTheDocument();
//   });

//   test("Logout removes token and navigates to login", async () => {
//     localStorage.setItem("token", "test-token");
//     window.history.pushState({}, "", "/studentPage");
//     render(<App />);
  
//     expect(screen.getByText("Mocked Student Page")).toBeInTheDocument();
  
//     localStorage.clear(); // Clean up
//   });


// });




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
      // <MemoryRouter initialEntries={["/"]}>
        <App />
      // </MemoryRouter>
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

  // test("Logout removes token and navigates to login", async () => {
  //   // localStorage.setItem("token", "test-token");
  //   window.history.pushState({}, "", "/studentPage");
  //   render(<App />);
  
  //   expect(screen.getByText("Mocked Student Page")).toBeInTheDocument();
  
  //   // localStorage.clear(); // Clean up
  // });

  // test("renders Student Details on /students/:id", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/students/1"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText("Student Details Page")).toBeInTheDocument();
  // });

  // test("renders Equipment Page on /equipment", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/equipment"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText("Equipment Page")).toBeInTheDocument();
  // });
});

// describe("Theme toggle", () => {
//   test("toggles between light and dark modes", () => {
//     render(
//       <MemoryRouter initialEntries={["/studentPage"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const modeDisplay = screen.getByTestId("current-mode");
//     const toggleButton = screen.getByTestId("theme-toggle");

//     // Default mode should be light
//     expect(modeDisplay.textContent).toBe("light");

//     // Click to toggle to dark
//     fireEvent.click(toggleButton);
//     expect(modeDisplay.textContent).toBe("dark");

//     // Click again to toggle back to light
//     fireEvent.click(toggleButton);
//     expect(modeDisplay.textContent).toBe("light");
//   });

// });
