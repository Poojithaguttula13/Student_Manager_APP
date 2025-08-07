import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentPage from './StudentPage';

// Mock the child components
jest.mock('../features/students/StudentForm', () => () => (
  <div data-testid="student-form">Mock Student Form</div>
));

jest.mock('../features/students/GradeFilter', () => () => (
  <div data-testid="grade-filter">Mock Grade Filter</div>
));

describe('StudentPage Component', () => {
  test('renders StudentForm and GradeFilter components', () => {
    render(<StudentPage />);

    // Check if mocked components are present
    expect(screen.getByTestId('student-form')).toBeInTheDocument();
    expect(screen.getByTestId('grade-filter')).toBeInTheDocument();
  });
});
