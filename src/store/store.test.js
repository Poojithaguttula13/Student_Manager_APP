import { store } from './store';
import studentReducer, {
  fetchStudents,
  addStudent,
  deleteStudent,
} from './StudentSlice';

jest.mock('axios', () =>({
    fetchStudents: jest.fn(),
    addStudent: jest.fn(),
    deleteStudent: jest.fn()

}));

describe('Redux store configuration', () => {
  it('should have the correct reducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('students');
  });

  it('should initialize students slice with default state', () => {
    const state = store.getState().students;
    expect(state).toEqual({ list: [] });
  });

});
