import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchStudents = () => axios.get(`${BASE_URL}/students`);
export const addStudent = (student) => axios.post(`${BASE_URL}/students`, student);
export const deleteStudent = (id) => axios.delete(`${BASE_URL}/students/${id}`);