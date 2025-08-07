import { configureStore } from '@reduxjs/toolkit';
import studentReducer, {
  fetchStudents,
  addStudent,
  deleteStudent,
} from './StudentSlice';

import * as StudentAPI from '../api/StudentAPI';


// Mock API module

jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

jest.mock('../api/StudentAPI');

describe('studentSlice async thunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        students: studentReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchStudents should fetch and set student list', async () => {
    const mockStudents = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    StudentAPI.getStudents.mockResolvedValue({ data: mockStudents });

    await store.dispatch(fetchStudents());

    const state = store.getState().students;
    expect(state.list).toEqual(mockStudents);
    expect(StudentAPI.getStudents).toHaveBeenCalledTimes(1);
  });

  test('addStudent should add a student to the list', async () => {
    const newStudent = { id: 3, name: 'Alice' };
    StudentAPI.createStudent.mockResolvedValue({ data: newStudent });

    await store.dispatch(addStudent(newStudent));

    const state = store.getState().students;
    expect(state.list).toContainEqual(newStudent);
    expect(StudentAPI.createStudent).toHaveBeenCalledWith(newStudent);
  });

  test('deleteStudent should remove the student from the list', async () => {
    // First preload state
    store = configureStore({
      reducer: {
        students: studentReducer,
      },
      preloadedState: {
        students: {
          list: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
          ],
        },
      },
    });

    StudentAPI.removeStudent.mockResolvedValue({}); // doesn't return data

    await store.dispatch(deleteStudent(1));

    const state = store.getState().students;
    expect(state.list).toEqual([{ id: 2, name: 'Jane' }]);
    expect(StudentAPI.removeStudent).toHaveBeenCalledWith(1);
  });
});
