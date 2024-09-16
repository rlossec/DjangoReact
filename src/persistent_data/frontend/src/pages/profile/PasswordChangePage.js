import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box, TextField, Button, Typography, Stack } from '@mui/material';

import AppBar from '../../components/AppBar'
import apiFetch from '../../utils/apiFetch';
import AuthContext from '../../context/AuthContext';


const PasswordChangePage = () => {
  const navigate = useNavigate();
  const {user, accessToken, refreshToken} = React.useContext(AuthContext)
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const initialFormData = {
    new_password1: '',
    new_password2: ''
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    if (formData.newPassword1 !== formData.newPassword2) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await apiFetch('dj-rest-auth/password/change/', 'POST', formData, accessToken, refreshToken);
      if (response.status === 200) {
          setSuccess('Mot de passe changé avec succès. Vous allez être déconnecté.');
          setError('');
          setTimeout(() => {
              navigate('/login');
          }, 3000);
      }
    } catch (error) {
      setError('Erreur lors du changement de mot de passe. Veuillez réessayer.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <AppBar page="Profil">
      <Box component="main">
        <Container maxWidth="md">
          <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Changer le mot de passe
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="primary" gutterBottom>
                {success}
              </Typography>
            )}
            <TextField
              label="Nouveau mot de passe"
              name="new_password1"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Confirmer le nouveau mot de passe"
              name="new_password2"
              type="password"
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
                Changer le mot de passe
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

export default PasswordChangePage;
