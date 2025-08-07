import axios from "axios";
const API = "http://localhost:3000/students";
export const getStudents = () => axios.get(API);
export const createStudent = (data) => axios.post(API, data);
export const removeStudent = (id) => axios.delete(`${API}/${id}`);