import store from '../store/Store'; // Adjust the path if needed
import { getStudents } from '../features/students/StudentsSlice'; // Optional: Import an action if you want to test dispatch
import studentReducer from '../features/students/StudentsSlice';

jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

describe('Redux Store', () => {
  it('should configure the store with students reducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('students');
  });

  it('should have the correct initial state for students', () => {
    const expectedInitialState = studentReducer(undefined, { type: '@@INIT' });
    const actualState = store.getState().students;
    expect(actualState).toEqual(expectedInitialState);
  });

  // Optional: test dispatching an action
  // it('should handle dispatched actions', async () => {
  //   await store.dispatch(getStudents()); // mock this API if needed
  //   const state = store.getState().students;
  //   expect(state.loading).toBe(false); // or whatever state you expect
  // });
});

import store from '../store/Store'; // Adjust the path if needed
import { getStudents } from '../features/students/StudentsSlice'; // Optional: Import an action if you want to test dispatch
import studentReducer from '../features/students/StudentsSlice';

jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

describe('Redux Store', () => {
  it('should configure the store with students reducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('students');
  });

  it('should have the correct initial state for students', () => {
    const expectedInitialState = studentReducer(undefined, { type: '@@INIT' });
    const actualState = store.getState().students;
    expect(actualState).toEqual(expectedInitialState);
  });

  // Optional: test dispatching an action
  // it('should handle dispatched actions', async () => {
  //   await store.dispatch(getStudents()); // mock this API if needed
  //   const state = store.getState().students;
  //   expect(state.loading).toBe(false); // or whatever state you expect
  // });
});
