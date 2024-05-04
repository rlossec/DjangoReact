
import React from 'react';

import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';

import AppBar from '../components/AppBar';


const HomePage = () => {
  return (
    <AppBar page="Accueil">
      {/* Contenu de la page d'accueil */}
      <Container component="h1" variant="h2">
        <Typography>Bienvenue sur la page d'accueil!</Typography>
      </Container>
    </AppBar>
  );
};

export default HomePage;
