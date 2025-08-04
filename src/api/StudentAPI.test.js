// src/api/api.test.js
import axios from 'axios';
import { fetchStudents, addStudent, deleteStudent } from './StudentAPI.jsx';

jest.mock('axios', () =>({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()

}));


describe('Student API', () => {
    it('fetchStudents should return student list', async () => {
        const mockData = [{ id: 1, name: 'John', age: 20 }];
        axios.get.mockResolvedValue({ data: mockData });
    
        const response = await fetchStudents();
    
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/students');
        expect(response.data).toEqual(mockData);
      });

  it('addStudent should post student data', async () => {
    const newStudent = { name: 'Alice', age: 22 };
    const mockResponse = { id: 2, ...newStudent };
    axios.post.mockResolvedValue({ data: mockResponse });

    const response = await addStudent(newStudent);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/students', newStudent);
    expect(response.data).toEqual(mockResponse);
  });

  it('deleteStudent should delete a student by ID', async () => {
    const id = 1;
    axios.delete.mockResolvedValue({ status: 200 });

    const response = await deleteStudent(id);
    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/students/${id}`);
    expect(response.status).toBe(200);
  });
});
