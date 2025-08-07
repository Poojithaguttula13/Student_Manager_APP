import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StudentTable from "./StudentTable";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'; // ✅ use the factory function
import thunk from "redux-thunk";
import * as StudentSlice from "../../store/StudentSlice";
import { BrowserRouter } from "react-router-dom";
import { fetchStudents, deleteStudent, addStudent } from "../../store/StudentSlice";
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from '../../store/StudentSlice'

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares); // ✅ pass middleware array to the function
// let store;
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock('axios', () =>({
    fetchStudents: jest.fn(),
    addStudent: jest.fn(),
    deleteStudent: jest.fn()

}));

describe('StudentTable', () => {
    let store;
    test('renders students from store', () => {
        const preloadedState = {
          students: {
            list: [
              { id: 1, name: 'Alice', age: 20 },
              { id: 2, name: 'Bob', age: 22 },
            ],
          },
        };
      
        const store = configureStore({
          reducer: {
            students: studentReducer,
          },
          preloadedState,
        });
      
        render(
          <Provider store={store}>
            <StudentTable />
          </Provider>
        );
      
        // Assert some expected behavior
        expect(screen.getByText(/Alice/)).toBeInTheDocument();
        expect(screen.getByText(/Bob/)).toBeInTheDocument();
      });
      
  });