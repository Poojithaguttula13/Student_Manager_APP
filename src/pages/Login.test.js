import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock axios
jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

jest.mock('axios'); // tells Jest to mock the entire axios module
axios.get = jest.fn(); // ensures axios.get is a mock function

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));


describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  

  test('shows validation errors when fields are empty', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('successful login redirects and shows success toast', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: '123456',
      token: 'mock-token',
    };
  
    axios.get.mockResolvedValueOnce({ data: [mockUser] });
  
    render(<Login />);
  
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockUser.password },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });
});

test('shows error toast on invalid credentials', async () => {
    const mockUser = {
      email: 'wrong@example.com',
      password: 'wrongpassword',
    };
  
    axios.get.mockResolvedValueOnce({ data: [] }); // no matching user
  
    render(<Login />);
  
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockUser.password },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
    });
  });
  

//   test('shows error toast on API failure', async () => {
//     axios.get.mockRejectedValueOnce(new Error('API failed'));

//     renderWithRouter(<Login />);

//     fireEvent.change(screen.getByLabelText(/email/i), {
//       target: { value: 'test@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/password/i), {
//       target: { value: 'password123' },
//     });

//     fireEvent.click(screen.getByRole('button', { name: /login/i }));

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Something went wrong', expect.any(Error));
//     });
//   });

});
