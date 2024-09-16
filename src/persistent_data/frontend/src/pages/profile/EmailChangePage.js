import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box, TextField, Button, Typography, Stack } from '@mui/material';

import AppBar from '../../components/AppBar'
import apiFetch from '../../utils/apiFetch';


const EmailChangePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const initialFormData = {
    email: '',
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Adresse email invalide.');
      return;
    }

    try {
      const response = await apiFetch('dj-rest-auth/user/update/', 'POST', formData);
      if (response.status === 200) {
        setError('Un email de confirmation a été envoyé à votre nouvelle adresse.');
      }
    } catch (error) {
      setMessage('Erreur lors du changement d\'email. Veuillez réessayer.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <AppBar page="Profil">
      <Box component="main">
        <Container maxWidth="sm">
          <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Changer l'adresse email
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            {message && (
              <Typography color="primary" gutterBottom>
                {message}
              </Typography>
            )}
            <TextField
              label="Nouvelle adresse email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
              >
                Changer l'email
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                size="large"
                onClick={handleCancel}
              >
                Annuler
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default EmailChangePage;
