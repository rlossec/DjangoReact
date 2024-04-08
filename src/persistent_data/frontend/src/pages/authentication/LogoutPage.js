import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AuthContext from '../../context/AuthContext'

const LogoutPage = () => {

  const { logoutUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    logoutUser();
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Logout successful
      </Typography>
      <Typography variant="body1">
        You have been logged out. Redirecting to the home page...
      </Typography>
    </Box>
  );
};

export default LogoutPage;
