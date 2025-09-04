import { store } from "./store";

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
