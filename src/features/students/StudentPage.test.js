// StudentsPage.test.js

// jest.mock('@mui/x-data-grid', () => ({
//     DataGrid: ({ rows }) => (
//       <div data-testid="mock-datagrid">
//         {rows.map((row) => (
//           <div key={row.id}>
//             <span>{row.name}</span>
//             <button onClick={() => {}} aria-label={`delete-${row.id}`}>Delete</button>
//           </div>
//         ))}
//       </div>
//     ),
//   }));
  
  
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react';
  import { Provider } from 'react-redux';
  import { MemoryRouter } from 'react-router-dom';
  import { configureStore } from '@reduxjs/toolkit';
  import studentsReducer from './StudentsSlice';
  import StudentsPage from './StudentPage';
  import * as studentActions from './StudentsSlice';
// import { fireEvent } from '@testing-library/dom/types';

jest.mock('@mui/x-data-grid', () => ({
    DataGrid: ({ rows, columns }) => {
      return (
        <div data-testid="mock-datagrid">
          {rows.map((row) => {
            const actionsColumn = columns.find((col) => col.field === 'actions');
            const actions = actionsColumn?.renderCell?.({ id: row.id });
  
            return (
              <div key={row.id} data-testid={`student-row-${row.id}`}>
                <span>{row.name}</span>
                {/* This renders the actual Delete button from your component logic */}
                {actions}
              </div>
            );
          })}
        </div>
      );
    },
  }));
  
  
  jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

  describe('StudentsPage', () => {
    const store = configureStore({
      reducer: {
        students: studentsReducer,
      },
      preloadedState: {
        students: [
          { id: 1, name: 'Alice', age: 12, grade: 'A' },
          { id: 2, name: 'Bob', age: 13, grade: 'B' },
        ],
      },
    });
  
    it('renders StudentsPage without crashing', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <StudentsPage />
          </MemoryRouter>
        </Provider>
      );
  
      expect(screen.getByText('Student Management')).toBeInTheDocument();
      expect(screen.getByTestId('mock-datagrid')).toBeInTheDocument();
    });

    it('calls removeStudent when delete is confirmed', () => {
        let store;
        store = configureStore({
            reducer: { students: studentsReducer },
            preloadedState: {
              students: [
                { id: 1, name: 'Alice', age: '12', grade: 'A' },
                { id: 2, name: 'Bob', age: '13', grade: 'B' },
              ],
            },
          });
      
          jest.spyOn(studentActions, 'removeStudent').mockImplementation((id) => ({
            type: 'removeStudent',
            payload: id,
          }));
      
          // Spy on action creators
          jest.spyOn(studentActions, 'createStudent').mockImplementation((data) => ({ type: 'createStudent', payload: data }));
          jest.spyOn(studentActions, 'removeStudent').mockImplementation((id) => ({ type: 'removeStudent', payload: id }));
        

          window.confirm = jest.fn(() => true);

          render(
            <Provider store={store}>
              <MemoryRouter>
                <StudentsPage />
              </MemoryRouter>
            </Provider>
          );
      
          // ✅ Click the Delete button rendered by `renderCell`
          const deleteButton = screen.getAllByText('Delete')[0];
          fireEvent.click(deleteButton);
      
          // ✅ Now this should pass
          expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this student?');
          expect(studentActions.removeStudent).toHaveBeenCalledWith(1);
        });

        it('dispatches createStudent when confirmed', () => {
            let store;
            store = configureStore({
                reducer: { students: studentsReducer },
                preloadedState: { students: [] },
              });
          
              jest.spyOn(studentActions, 'createStudent').mockImplementation((data) => ({
                type: 'createStudent',
                payload: data,
              }));
            window.confirm = jest.fn(() => true); // ✅ simulate user clicks "OK"
        
            render(
              <Provider store={store}>
                <MemoryRouter>
                  <StudentsPage />
                </MemoryRouter>
              </Provider>
            );
        
            // ✅ Fill the form
            fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText('Age'), { target: { value: '15' } });
            fireEvent.mouseDown(screen.getByLabelText('Grade')); // open dropdown
  const gradeOption = screen.getByText('B');
  fireEvent.click(gradeOption); // select 'B'

  fireEvent.click(screen.getByText('Add Student'));

  expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to add this student?');
  expect(studentActions.createStudent).toHaveBeenCalledWith({
    name: 'John',
    age: '15',
    grade: 'B',
  });
          });

  });
  