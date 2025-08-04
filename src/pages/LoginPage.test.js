// LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import * as AuthAPI from '../api/AuthAPI';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock useNavigate explicitly as a jest function
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

jest.mock('../api/AuthAPI');

describe('LoginPage', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    render(<LoginPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/admin login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error message on invalid credentials', () => {
    AuthAPI.validateCredentials.mockReturnValue(null);

    render(<LoginPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser', name: 'username' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass', name: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('navigates to /students on valid login', () => {
    AuthAPI.validateCredentials.mockReturnValue('mock-token');

    render(<LoginPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin', name: 'username' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin123', name: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(mockedNavigate).toHaveBeenCalledWith('/students');
  });
});
