// import { store } from './store';
// import studentReducer, {
//   fetchStudents,
//   addStudent,
//   deleteStudent,
// } from './StudentSlice';

// jest.mock('axios', () =>({
//     fetchStudents: jest.fn(),
//     addStudent: jest.fn(),
//     deleteStudent: jest.fn()

// }));

// describe('Redux store configuration', () => {
//   test('should have the correct reducer', () => {
//     const state = store.getState();
//     expect(state).toHaveProperty('students');
//   });

//   test('should initialize students slice with default state', () => {
//     const state = store.getState().students;
//     expect(state).toEqual({ list: [] });
//   });

// });



import { store } from "./store";
import { fetchStudents, addStudent, deleteStudent } from "./StudentSlice"; // import your actions



jest.mock('axios', () =>({
    fetchStudents: jest.fn(),
    addStudent: jest.fn(),
    deleteStudent: jest.fn()

}));

describe("Redux store", () => {
  test("should have the correct initial state", () => {
    const state = store.getState();
    expect(state.students).toBeDefined();
    expect(state.students.list).toEqual([]); // assuming initial state has list: []
  });

});
