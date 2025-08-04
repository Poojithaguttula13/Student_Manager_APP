import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../routes/Route';
import LoginPage from '../pages/LoginPage';
import StudentsPage from '../features/students/StudentPage';

// Optional: mock the components if needed
jest.mock('../pages/LoginPage', () => () => <div>Login Page</div>);
jest.mock('../features/students/StudentPage', () => () => <div>Students Page</div>);

describe('AppRoutes', () => {
  it('renders LoginPage at path "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders StudentsPage at path "/students"', () => {
    render(
      <MemoryRouter initialEntries={['/students']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Students Page')).toBeInTheDocument();
  });

  it('shows nothing for unmatched route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Students Page')).not.toBeInTheDocument();
  });
});
