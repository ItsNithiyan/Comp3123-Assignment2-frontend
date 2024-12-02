import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Link as MuiLink, 
  Paper 
} from '@mui/material';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext); // Destructure login from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      login(res.data.token); // Call the login function with the token
      navigate('/employees'); // Navigate to the employees page
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
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
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
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
            label="Password"
            name="password"
            type="password"
            value={password}
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
            Login
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ mt: 2, color: '#555' }} 
        >
          Don't have an account?{' '}
          <MuiLink 
            component={Link} 
            to="/signup" 
            sx={{
              color: '#4CAF50', // Green link color
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Signup Here
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
