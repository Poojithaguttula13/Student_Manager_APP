import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentDetails from './StudentDetails'; // adjust path as needed
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => jest.fn(),
  };
});

const mockStudent = {
  name: 'John Doe',
  age: 15,
  grade: '10th',
  image: 'https://example.com/image.jpg',
  description: 'A curious learner',
};

describe('StudentDetails Component', () => {
  test('renders student details when state is provided', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/details', state: mockStudent }]}>
        <Routes>
          <Route path="/details" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age: 15')).toBeInTheDocument();
    expect(screen.getByText('Grade: 10th')).toBeInTheDocument();
    expect(screen.getByText('A curious learner')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockStudent.image);
  });

  test('shows fallback message when no student data is passed', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route path="/details" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No student data found. Please go back to the student list/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  test('shows fallback message when no student data is passed', () => {
    const mockNavigate = jest.fn();
const mockLocation = { state: null }; // fallback by default

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

    mockLocation.state = null; // simulate no state

    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route path="/details" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No student data found. Please go back to the student list/i)
    ).toBeInTheDocument();

    const fallbackBackButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(fallbackBackButton);

    // expect(mockNavigate).toHaveBeenCalledWith('/studentPage');
  });

});
