import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Rediriger l'utilisateur vers la page d'accueil après 3 secondes
      navigate('/');
    }, 3000);

    // Nettoyer le timer lorsque le composant est démonté
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
