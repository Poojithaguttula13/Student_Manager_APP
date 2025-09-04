import reducer, {
  fetchStudents,
  addStudent,
  deleteStudent,
  fetchEquipment,
  fetchEquipmentTable,
} from "./StudentSlice";
import * as api from "../api/StudentAPI";

jest.mock("../api/StudentAPI");

jest.mock('axios', () =>({
    getStudents: jest.fn(),
    createStudent: jest.fn(),
    removeStudent: jest.fn()

}));
describe("studentSlice", () => {
  const initialState = {
    list: [],
    equipmentList: [],
    equipmentTable: [],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("reducers from thunks", () => {
    test("should handle fetchStudents.fulfilled", () => {
      const payload = [{ id: 1, name: "John" }];
      const nextState = reducer(initialState, {
        type: fetchStudents.fulfilled.type,
        payload,
      });
      expect(nextState.list).toEqual(payload);
    });

    test("should handle addStudent.fulfilled", () => {
      const payload = { id: 2, name: "Jane" };
      const prevState = { ...initialState, list: [{ id: 1, name: "John" }] };
      const nextState = reducer(prevState, {
        type: addStudent.fulfilled.type,
        payload,
      });
      expect(nextState.list).toEqual([
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ]);
    });

    test("should handle deleteStudent.fulfilled", () => {
      const prevState = {
        ...initialState,
        list: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
      };
      const nextState = reducer(prevState, {
        type: deleteStudent.fulfilled.type,
        payload: 1,
      });
      expect(nextState.list).toEqual([{ id: 2, name: "Jane" }]);
    });

    test("should handle fetchEquipment.fulfilled", () => {
      const payload = [{ id: "eq1", type: "Treadmill" }];
      const nextState = reducer(initialState, {
        type: fetchEquipment.fulfilled.type,
        payload,
      });
      expect(nextState.equipmentList).toEqual(payload);
    });

    test("should handle fetchEquipmentTable.fulfilled", () => {
      const payload = [{ id: "row1", equipment: "Bike" }];
      const nextState = reducer(initialState, {
        type: fetchEquipmentTable.fulfilled.type,
        payload,
      });
      expect(nextState.equipmentTable).toEqual(payload);
    });
  });

  describe("async thunks", () => {
    test("fetchStudents should call API and return data", async () => {
      const mockData = { data: [{ id: 1, name: "John" }] };
      api.getStudents.mockResolvedValueOnce(mockData);

      const result = await fetchStudents()(
        jest.fn(), // dispatch
        () => ({}), // getState
        undefined // extra
      );

      expect(api.getStudents).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(mockData.data);
    });

    test("addStudent should call API and return data", async () => {
      const student = { name: "Jane" };
      const mockData = { data: { id: 2, ...student } };
      api.createStudent.mockResolvedValueOnce(mockData);

      const result = await addStudent(student)(
        jest.fn(),
        () => ({}),
        undefined
      );

      expect(api.createStudent).toHaveBeenCalledWith(student);
      expect(result.payload).toEqual(mockData.data);
    });

    test("deleteStudent should call API and return id", async () => {
      api.removeStudent.mockResolvedValueOnce({});
      const id = 1;

      const result = await deleteStudent(id)(
        jest.fn(),
        () => ({}),
        undefined
      );

      expect(api.removeStudent).toHaveBeenCalledWith(id);
      expect(result.payload).toBe(id);
    });

    test("fetchEquipment should call API and return data", async () => {
      const mockData = { data: [{ id: "eq1", type: "Treadmill" }] };
      api.getEquipment.mockResolvedValueOnce(mockData);

      const result = await fetchEquipment()(
        jest.fn(),
        () => ({}),
        undefined
      );

      expect(api.getEquipment).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(mockData.data);
    });

    test("fetchEquipmentTable should call API and return data", async () => {
      const mockData = { data: [{ id: "row1", equipment: "Bike" }] };
      api.getEquipmentTable.mockResolvedValueOnce(mockData);

      const result = await fetchEquipmentTable()(
        jest.fn(),
        () => ({}),
        undefined
      );

      expect(api.getEquipmentTable).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(mockData.data);
    });
  });

});
