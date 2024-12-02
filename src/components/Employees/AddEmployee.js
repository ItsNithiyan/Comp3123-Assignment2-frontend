import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function AddEmployee() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { name, department, position, salary } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', {
        name,
        department,
        position,
        salary: Number(salary),
      });
      setSuccess('Employee added successfully!');
      setError('');
      setFormData({ name: '', department: '', position: '', salary: '' });
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to add employee. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#e3f2fd', // Light sky blue background
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Add New Employee
        </Typography>

        {/* Error and Success Messages */}
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}

        <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Department"
            name="department"
            value={department}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Position"
            name="position"
            value={position}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={salary}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2, padding: '10px' }}
          >
            Add Employee
          </Button>
        </Box>

        <Box sx={{ mt: 2, width: '100%' }}>
          <Button 
            component={Link} 
            to="/employees" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 2, padding: '10px', color: 'primary.main', borderColor: 'primary.main' }}
          >
            Back to Employee List
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddEmployee;
