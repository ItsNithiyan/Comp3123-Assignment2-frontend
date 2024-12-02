import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Paper, 
  Link as MuiLink
} from '@mui/material';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const { login } = useContext(AuthContext); // Optional: If you want to auto-login after signup
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/signup', { name, email, password });
      setSuccess('Signup successful! You can now log in.');
      setError('');
      setFormData({ name: '', email: '', password: '' });
      // Optionally, navigate to login page after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Signup failed. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#aee2ff', // Sky Blue background
      }}
    >
      <Paper
        elevation={6} // Lighter shadow
        sx={{
          width: '100%',
          padding: 4,
          borderRadius: '16px', // Rounded corners
          backgroundColor: '#ffffff', // White background for form box
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Light shadow effect
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            color: '#333', 
          }}
        >
          Signup
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#f9f9f9', // Very light gray
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#cccccc', // Light gray border color
                },
                '&:hover fieldset': {
                  borderColor: '#888888', // Darker gray border on hover
                },
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#cccccc', 
                },
                '&:hover fieldset': {
                  borderColor: '#888888', 
                },
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            helperText="Minimum 6 characters"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#cccccc', 
                },
                '&:hover fieldset': {
                  borderColor: '#888888', 
                },
              },
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{
              mt: 2,
              padding: '12px', 
              borderRadius: '8px',
              backgroundColor: '#4CAF50', // Green for button
              '&:hover': {
                backgroundColor: '#388E3C', // Dark green on hover
              },
            }}
          >
            Signup
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ mt: 2, color: '#555' }} 
        >
          Already have an account?{' '}
          <MuiLink 
            component={Link} 
            to="/" 
            sx={{
              color: '#4CAF50', // Green link color
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Login Here
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;
