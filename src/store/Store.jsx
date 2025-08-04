import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/students/StudentsSlice';

const store = configureStore({
  reducer: {
    students: studentReducer
  }
});

export default store;