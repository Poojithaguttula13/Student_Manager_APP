import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  getStudents,
  createStudent,
  removeStudent
} from '../students/StudentsSlice'; // adjust path if needed
import * as StudentAPI from '../../api/StudentAPI'; // adjust path if needed
// import store from '../../store/Store'
// import store from '../../store/Store';


jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

// ✅ Mock the API module
jest.mock('../../api/StudentAPI.jsx');
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares); 

describe('StudentsSlice', () => {

    it('should handle getStudents.fulfilled', () => {
        const mockData = [{ id: 1, name: 'Alice' }];
    
        const action = {
          type: getStudents.fulfilled.type,
          payload: mockData,
        };
    
        const newState = reducer([], action);
        expect(newState).toEqual(mockData);
      });

  it('should return the initial state', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual([]);
  });

  it('should handle createStudent.fulfilled', () => {
    const mockStudent = { id: 2, name: 'Bob' };

    const action = {
      type: createStudent.fulfilled.type,
      payload: mockStudent,
    };

    const prevState = [{ id: 1, name: 'Alice' }];
    const newState = reducer(prevState, action);

    expect(newState).toEqual([...prevState, mockStudent]);
  });

  it('should handle removeStudent.fulfilled', () => {
    const action = {
      type: removeStudent.fulfilled.type,
      payload: 1,
    };

    const prevState = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const newState = reducer(prevState, action);

    expect(newState).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it('dispatches getStudents and returns data', async () => {
    const mockData = [{ id: 1, name: 'Alice' }];
    StudentAPI.fetchStudents.mockResolvedValue({ data: mockData });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = getStudents();
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.fetchStudents).toHaveBeenCalled();
    expect(result.payload).toEqual(mockData);
    expect(result.type).toBe('students/getStudents/fulfilled');
  });

  it('dispatches createStudent and returns new student', async () => {
    const newStudent = { id: 2, name: 'Bob' };
    StudentAPI.addStudent.mockResolvedValue({ data: newStudent });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = createStudent(newStudent);
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.addStudent).toHaveBeenCalledWith(newStudent);
    expect(result.payload).toEqual(newStudent);
    expect(result.type).toBe('students/createStudent/fulfilled');
  });

  it('dispatches removeStudent and returns deleted ID', async () => {
    const id = 2;
    StudentAPI.deleteStudent.mockResolvedValue();

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = removeStudent(id);
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.deleteStudent).toHaveBeenCalledWith(id);
    expect(result.payload).toBe(id);
    expect(result.type).toBe('students/removeStudent/fulfilled');
  });

});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  getStudents,
  createStudent,
  removeStudent
} from '../students/StudentsSlice'; // adjust path if needed
import * as StudentAPI from '../../api/StudentAPI'; // adjust path if needed
// import store from '../../store/Store'
// import store from '../../store/Store';


jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));

// ✅ Mock the API module
jest.mock('../../api/StudentAPI.jsx');
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares); 

describe('StudentsSlice', () => {

    it('should handle getStudents.fulfilled', () => {
        const mockData = [{ id: 1, name: 'Alice' }];
    
        const action = {
          type: getStudents.fulfilled.type,
          payload: mockData,
        };
    
        const newState = reducer([], action);
        expect(newState).toEqual(mockData);
      });

  it('should return the initial state', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual([]);
  });

  it('should handle createStudent.fulfilled', () => {
    const mockStudent = { id: 2, name: 'Bob' };

    const action = {
      type: createStudent.fulfilled.type,
      payload: mockStudent,
    };

    const prevState = [{ id: 1, name: 'Alice' }];
    const newState = reducer(prevState, action);

    expect(newState).toEqual([...prevState, mockStudent]);
  });

  it('should handle removeStudent.fulfilled', () => {
    const action = {
      type: removeStudent.fulfilled.type,
      payload: 1,
    };

    const prevState = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const newState = reducer(prevState, action);

    expect(newState).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it('dispatches getStudents and returns data', async () => {
    const mockData = [{ id: 1, name: 'Alice' }];
    StudentAPI.fetchStudents.mockResolvedValue({ data: mockData });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = getStudents();
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.fetchStudents).toHaveBeenCalled();
    expect(result.payload).toEqual(mockData);
    expect(result.type).toBe('students/getStudents/fulfilled');
  });

  it('dispatches createStudent and returns new student', async () => {
    const newStudent = { id: 2, name: 'Bob' };
    StudentAPI.addStudent.mockResolvedValue({ data: newStudent });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = createStudent(newStudent);
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.addStudent).toHaveBeenCalledWith(newStudent);
    expect(result.payload).toEqual(newStudent);
    expect(result.type).toBe('students/createStudent/fulfilled');
  });

  it('dispatches removeStudent and returns deleted ID', async () => {
    const id = 2;
    StudentAPI.deleteStudent.mockResolvedValue();

    const dispatch = jest.fn();
    const getState = jest.fn();

    const thunk = removeStudent(id);
    const result = await thunk(dispatch, getState, undefined);

    expect(StudentAPI.deleteStudent).toHaveBeenCalledWith(id);
    expect(result.payload).toBe(id);
    expect(result.type).toBe('students/removeStudent/fulfilled');
  });

});
