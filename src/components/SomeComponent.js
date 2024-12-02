// src/components/SomeComponent.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function SomeComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/target-route');
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Go to Target
    </Button>
  );
}

export default SomeComponent;
