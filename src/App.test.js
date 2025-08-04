import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// ✅ Mock child route components to isolate App test
jest.mock('./routes/Route', () => () => <div>Mocked App Routes</div>);

describe('App component', () => {
  it('renders without crashing and includes AppRoutes', () => {
    render(<App />);
    expect(screen.getByText('Mocked App Routes')).toBeInTheDocument();
  });
});
