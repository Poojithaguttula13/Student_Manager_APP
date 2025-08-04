import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Paper, Stack, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStudent, getStudents, removeStudent } from './StudentsSlice';

const StudentsPage = () => {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students);
    const [form, setForm] = useState({ name: '', age: '', grade: '' });
    const [gradeFilter, setGradeFilter] = useState('ALL');
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) navigate('/');
      dispatch(getStudents());
    }, [dispatch, navigate]);
  
    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this student?')) {
        dispatch(removeStudent(id));
      }
    };
  
    const handleAdd = () => {
      if (window.confirm('Are you sure you want to add this student?')) {
        dispatch(createStudent(form));
        setForm({ name: '', age: '', grade: '' });
      }
    };
  
    const filteredStudents = gradeFilter === 'ALL'
      ? students
      : students.filter((s) => s.grade === gradeFilter);
  
    const columns = [
    //   { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'age', headerName: 'Age', width: 150 },
      { field: 'grade', headerName: 'Grade', width: 200 },
      {
        field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => (
          <Button color="error" onClick={() => handleDelete(params.id)}>Delete</Button>
        )
      }
    ];
  
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Box sx={{ width: '90%', mx: 'auto', mt: 5 }}>
        <Typography variant="h3" textAlign={'center'} gutterBottom>Student Management</Typography>
  
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <TextField
            label="Grade"
            select
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleAdd}>Add Student</Button>
        </Box>
  
        <TextField
          select
          label="Filter by Grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          sx={{ mb: 2, width: 200 }}
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
        </TextField>
        <Typography variant="h4" gutterBottom>Student Details</Typography>

        <DataGrid rows={filteredStudents} columns={columns} pageSize={5} rowsPerPageOptions={[5]} autoHeight />
      </Box>
      </Paper>
    );
  };

export default StudentsPage;