import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateCredentials } from '../api/AuthAPI';
// import { validateCredentials } from '../common';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const token = validateCredentials(form.username, form.password);
    if (token) {
      localStorage.setItem('token', token);
      navigate('/students');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h6">Admin Login</Typography>
      <TextField label="Username" fullWidth margin="normal" name="username" onChange={handleChange} />
      <TextField label="Password" type="password" fullWidth margin="normal" name="password" onChange={handleChange} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>Login</Button>
    </Paper>
  );
};

export default LoginPage;