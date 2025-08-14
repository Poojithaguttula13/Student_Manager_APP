import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStudents, createStudent, removeStudent, getEquipment, getEquipmentTable } from "../api/StudentAPI";

export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const res = await getStudents();
  return res.data;
});

export const addStudent = createAsyncThunk("students/add", async (student) => {
  const res = await createStudent(student);
  return res.data;
});

export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await removeStudent(id);
  return id;
});

export const fetchEquipment = createAsyncThunk("equipment/fetch", async () => {
  const res = await getEquipment();
  return res.data;
});

export const fetchEquipmentTable = createAsyncThunk(
  "equipment/fetchTable",
  async () => {
    const res = await getEquipmentTable();
    return res.data;
  }
);


const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    equipmentList: [], 
    equipmentTable: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.equipmentList = action.payload;
      })
      .addCase(fetchEquipmentTable.fulfilled, (state, action) => {
        state.equipmentTable = action.payload;
      });
  },
});

export default studentSlice.reducer;