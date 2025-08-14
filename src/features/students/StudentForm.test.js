import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentForm from './StudentForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addStudent } from '../../store/StudentSlice';
import { toast } from 'react-toastify';

jest.mock('../../store/StudentSlice', () => ({
  addStudent: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore([]);
let store;

const renderWithProvider = (component) =>
  render(<Provider store={store}>{component}</Provider>);

describe('StudentForm', () => {
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn(); // spy on dispatch
  });

  test('renders all form fields', () => {
    renderWithProvider(<StudentForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Grade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    renderWithProvider(<StudentForm />);
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Age is required')).toBeInTheDocument();
      expect(screen.getByText('Grade is required')).toBeInTheDocument();
    });
  });

  test('dispatches addStudent action and shows toast on successful submit', async () => {
    addStudent.mockImplementation((data) => ({ type: 'students/add', payload: data }));

    renderWithProvider(<StudentForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: '21' },
    });
    fireEvent.mouseDown(screen.getByLabelText(/Grade/i));
    fireEvent.click(screen.getByText('A'));

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        addStudent({ name: 'Alice', age: 21, grade: 'A' })
      );
      expect(toast.success).toHaveBeenCalledWith('Student added successfully!');
    });
  });

});
