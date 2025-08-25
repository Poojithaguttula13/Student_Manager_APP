import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDetails from "./pages/StudentDetails";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import StudentPage from "./pages/StudentPage";
import EquipmentPage from "./pages/EquipmentPage";

export default function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#1e1e1e",
                  paper: "#1d1d1d",
                },
                text: {
                  primary: "#ffffff",
                },
                primary: {
                  main: "#1d1d1d",
                },
              }
            : {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#000000",
                },
                primary: {
                  main: "#1976d2",
                },
              }),
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/studentPage"
            element={
              <PrivateRoute>
                <Layout toggleTheme={toggleTheme} mode={mode}>
                  <StudentPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <PrivateRoute>
                <Layout toggleTheme={toggleTheme} mode={mode}>
                  <StudentDetails />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route 
            path="/equipment"
            element={
              <PrivateRoute>
                <Layout toggleTheme={toggleTheme} mode={mode}>
                <EquipmentPage />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* <Route 
            path="/equipmentTable"
            element={
              <PrivateRoute>
                <Layout toggleTheme={toggleTheme} mode={mode}>
                <EquipmentTable></EquipmentTable>
                </Layout>
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}
