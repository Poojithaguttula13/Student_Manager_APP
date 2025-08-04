import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addStudent, deleteStudent, fetchStudents } from '../../api/StudentAPI';
// import { fetchStudents, addStudent, deleteStudent } from '../api/studentApi';

export const getStudents = createAsyncThunk('students/getStudents', async () => {
  const response = await fetchStudents();
  return response.data;
});

export const createStudent = createAsyncThunk('students/createStudent', async (student) => {
  const response = await addStudent(student);
  return response.data;
});

export const removeStudent = createAsyncThunk('students/removeStudent', async (id) => {
  await deleteStudent(id);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.fulfilled, (_, action) => action.payload)
      .addCase(createStudent.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        return state.filter((s) => s.id !== action.payload);
      });
  }
});

export default studentSlice.reducer;
